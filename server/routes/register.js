const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../dbconfig");
const isLoggedIn = require("../middleware/user-authentication");
const router = express.Router();
const donorValidationRules = require("../validations/donorvalidationrules");
const userValidationRules = require("../validations/userValidationRules");
const { validationResult } = require("express-validator");

router.post("/", userValidationRules(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const param = errors.array()[0].param;
    const error = errors.array()[0].msg;

    return res.status(400).send({ status: "false", data: { [param]: error } });
  }
  try {
    const {
      firstName,
      lastName,
      address,
      userDistrict,
      emailAddress,
      password,
    } = req.body;
    db.query(
      "SELECT emailAddress From user_details where emailAddress = ?",
      [emailAddress],
      async (error, result) => {
        if (error) {
          return res
            .status(400)
            .send({ status: error, message: error.message });
        }

        if (result.length > 0) {
          return res.send({
            status: false,
            message: "User already registered.",
          });
        } else {
          var encryptedPassword = await bcrypt.hash(password, 8);
          const user = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            userDistrict: userDistrict,
            emailAddress: emailAddress,
            password: encryptedPassword,
          };
          const jwtToken = jwt.sign(user, "bld_network_jwtPrivateKey", {
            expiresIn: "1d",
          });

          async function main() {
            const url = `http://c2e0f4542f33.ngrok.io/api/register/confirmation/${jwtToken}`;

            // create reusable transporter object using the default SMTP transport

            let transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: "bloodnetworkapp@gmail.com", //mail used to send mail
                pass: "147@BloodNetwork", // pw for mail
              },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"Blood Network" <bloodNetwork@gmail.com>', // sender address
              to: user.emailAddress, // list of receivers
              subject: "Confirmation Mail", // Subject line
              text: "Please press to confirm.", // plain text body
              html: `<h1>Blood Network</h1>
                      <h3>You're trying to sign up in Blood Network</h3>
                      <h5>Please confirm your email by clickin on link below</h5>  
                <span>Verification Link:  <a href="${url}" style="fontColor:red;">Verify Email</a></span>
                </br>
                </br>
                <p>If you did not request a email verification mail,
                contact us at bloodnetworkapp@gmail.com</p>
                </br>
                <p>&copy; 2020 Blood Network, All rights reserved</p>`, // html body
            });
            //console.log("message sent");
          }

          main().catch(() => {
            return res
              .status(400)
              .send({ status: "error", message: "Something went wrong" });
          });
          return res.send({
            status: true,
            message: "Email has been sent for verification",
          });
        }

        //

        // db.query("Insert INTO user_details SET ? ", {firstName: firstName, lastName: lastName, address: address, emailAddress:emailAddress, password:encryptedPassword}, (error, result)=>{
        //     if(error) return res.send("Something is wrong")
        //     else return res.send({result: result, details: "user registered"})
        // });
      }
    );
  } catch (ex) {
    return res.status(400).send({ status: "error", message: ex.message });
  }
});

router.get("/confirmation/:token", async (req, res) => {
  try {
    console.log("token: ", req.params.token);
    if (req.params.token) {
      jwt.verify(
        req.params.token,
        "bld_network_jwtPrivateKey",
        async (error, user) => {
          if (error)
            return res.json({
              status: "error",
              message: "something went wrong",
            });
          db.query(
            "Select * from user_details where emailAddress = ?",
            [user.emailAddress],
            (error, result) => {
              if (error)
                return res.json({
                  status: "error",
                  message: "Something went wrong",
                });
              if (user.length > 0)
                return res.json({
                  status: "fail",
                  message: "User already registered",
                });

              db.query(
                "Insert INTO user_details SET ? ",
                {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  address: user.address,
                  userDistrict: user.userDistrict,
                  emailAddress: user.emailAddress,
                  password: user.password,
                },
                (error, result) => {
                  if (error) return res.send("Something is wrong");
                  else return res.render("registration");
                  //console.log("user", user);
                }
              );
            }
          );
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
});

router.post(
  "/donor",
  isLoggedIn.isLoggedIn,
  donorValidationRules(),
  (req, res) => {
    var userId = req.user.userId;
    var table = "donor_details";
    const role = "donor";

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const param = errors.array()[0].param;
      const error = errors.array()[0].msg;
      return res.status(400).send({ status: "fail", data: { [param]: error } });
    }

    const donor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      donorDistrict: req.body.district,
      donorProvince: req.body.province,
      donorContact: req.body.mobileNum,
      bloodType: req.body.bloodType,
      gender: req.body.gender,
      dob: req.body.dob,
      showContact: req.body.showContact,
      userId: userId,
    };
    try {
      db.query(
        "SELECT userId FROM ?? where userId = ?",
        [table, userId],
        (error, results) => {
          if (error) {
            return res
              .status(400)
              .send({ status: "error", message: error.message });
          }

          if (results.length < 1) {
            try {
              sql = "Insert into donor_details set ?";
              db.query(sql, [donor], (error, results) => {
                if (error) {
                  return res
                    .status(400)
                    .send({ status: "error", message: error.message });
                } else {
                  try {
                    db.query(
                      "Update user_details set role = ? where userId = ?",
                      [role, userId],
                      (error, result) => {
                        if (error) {
                          return res.json({
                            status: "error",
                            message: error.message,
                          });
                        }
                        return res.send({
                          status: "success",
                          data: "Donor registered.",
                        });
                      }
                    );
                  } catch (ex) {
                    return res.json({ status: "error", message: ex.message });
                  }
                }
              });
            } catch (ex) {
              return res
                .status(400)
                .send({ status: "error", message: ex.message });
            }
          } else {
            return res.send({
              status: "fail",
              message: "The user is already registered as donor!",
            });
          }
        }
      );
    } catch (ex) {
      return res.status(400).send({ status: "error", message: ex.message });
    }
  }
);

module.exports = router;
