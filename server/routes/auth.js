const express = require("express");
const bcrypt = require("bcryptjs");
const logout = require("../middleware/logoutMiddleware");
var db = require("../dbconfig");
const jwt = require("jsonwebtoken");
const router = express.Router();
const sendMail = require("../middleware/email");
const { isLoggedIn } = require("../middleware/user-authentication");

const generateResetToken = () => {
  const token = Math.floor(100000 + Math.random() * 900000);
  return token;
};

router.post("/", (req, res) => {
  var email = req.body.emailAddress;
  var password = req.body.password;

  db.query(
    "SELECT * FROM user_details WHERE emailAddress = ?",
    [email],
    async (error, results) => {
      if (error) {
        res.send({
          status: false,
          message: "Something went wrong",
        });
      } else {
        if (results.length > 0) {
          if (await bcrypt.compare(password, results[0].password)) {
            const token = jwt.sign(
              { userId: results[0].userId },
              "bld_network_jwtPrivateKey",
              { expiresIn: "30d" }
            );
            const cookieOptions = {
              expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookieOptions);
            return res.send({
              status: true,
              message: "Authenticated",
              user: results[0].userId,
              token: token,
            });
          } else {
            return res.send({
              status: false,
              message: "Password does not match",
            });
          }
        } else {
          return res.send({
            status: false,
            message: results + "Enter a valid name or username",
          });
        }
      }
    }
  );
});

router.post("/user/reset", async (req, res) => {
  try {
    const email = req.body.email;
    await db.query(
      "Select * from user_details where emailAddress=?",
      [email],
      async (error, user) => {
        if (error) {
          return res.json({ status: "error", message: error.message });
        }
        if (user.length < 1) {
          console.log(1);
          return res.json({
            status: "fail",
            message: { User: "User not found!!" },
          });
        }
        var checkAndSendToken = async function () {
          const resetToken = generateResetToken();
          console.log(1);
          console.log(resetToken);
          db.query(
            "Select * from tokens where token = ?",
            [resetToken],
            (error, token) => {
              if (error) {
                return res.json({ status: "error", message: error.message });
              }
              console.log(token);
              if (token.length < 1) {
                db.query(
                  "Select * from tokens where userEmail = ?",
                  [email],
                  (error, emailToken) => {
                    if (error) {
                      return res.json({
                        status: "error",
                        message: error.message,
                      });
                    }
                    if (emailToken) {
                      console.log(1);
                      db.query(
                        "Delete from tokens where userEmail = ?",
                        [email],
                        (error, result) => {
                          if (error) {
                            return res.json({
                              status: "error",
                              message: error.message,
                            });
                          }
                        }
                      );
                    }
                    const tokenDetails = {
                      token: resetToken,
                      userEmail: email,
                      issuedDate: new Date(),
                    };
                    db.query(
                      "Insert into tokens set ? ",
                      [tokenDetails],
                      (error, result) => {
                        if (error) {
                          return res.json({
                            status: "error",
                            message: error.message,
                          });
                        }
                        sendMail(
                          (data = resetToken.toString()),
                          (recepient = email)
                        )
                          .then(() => {
                            return res.json({
                              status: "success",
                              data: { token: resetToken },
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }
                    );
                  }
                );
              } else {
                checkAndSendToken();
              }
            }
          );
        };
        checkAndSendToken();
      }
    );
  } catch (ex) {
    return res.json(ex.message);
  }
});

router.post("/user/reset/check_token", (req, res) => {
  try {
    const email = req.body.email;
    const token = req.body.token;

    db.query(
      "Select * from tokens where userEmail = ? and token = ?",
      [email, token],
      (error, token) => {
        if (error) {
          return res.json({ status: "error", message: error.message });
        }
        if (token.length == 1) {
          return res.json({ status: "success", data: { token: "matched" } });
        } else {
          return res.json({
            status: "fail",
            data: { token: "Token doesn't match! Try again" },
          });
        }
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
});

router.put("/user/reset/change_password", async (req, res) => {
  try {
    const email = req.body.email;
    const password = await bcrypt.hashSync(req.body.password);
    db.query(
      "Update user_details set password = ? where emailAddress = ?",
      [password, email],
      (error, result) => {
        if (error) {
          return res.json({ status: "error", message: error.password });
        }
        return res.json({
          status: "success",
          data: { password: "Password changed successfully" },
        });
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
});

router.get("/out", isLoggedIn, logout.loggedOut, (req, res) => {
  return res.send({ status: true, details: "logged out successfully" });
});

module.exports = router;
