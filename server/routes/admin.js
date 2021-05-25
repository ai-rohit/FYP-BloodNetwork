const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../dbconfig");
const {
  isLoggedIn,
  isLoggedOut,
  isAdminLoggedIn,
} = require("../middleware/user-authentication");
const { body, validationResult } = require("express-validator");
const validationRules = require("../validations/campaignvalidation");
const { campaignsAuthorization } = require("../middleware/authorization");
const router = express.Router();

router.get("/login", isLoggedOut, (req, res) => {
  res.render("admin_login");
});

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("*Email seems invalid")
      .exists()
      .withMessage("*Email value is empty"),
    body("password")
      .isLength({ max: 16, min: 8 })
      .withMessage("Password length must be between 8-16 char")
      .exists()
      .withMessage("*Password seems to be missing"),
  ],
  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    const error = {};
    errors.array().forEach((err) => {
      error[err.param] = err.msg;
    });
    console.log(error);
    if (!errors.isEmpty()) {
      return res.json({
        status: "fail",
        data: error,
      });
    }
    db.query(
      "SELECT * FROM user_details WHERE emailAddress = ?",
      [email],
      async (error, results) => {
        if (error) {
          return res.send({
            status: error,
            message: error.message,
          });
        } else {
          if (results.length > 0) {
            if (results[0].role !== "admin") {
              return res.send({
                status: "fail",
                message: "User access denied",
              });
            }

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
              return res.json({
                status: "success",
                user: {},
              });
            } else {
              return res.send({
                status: "fail",
                data: {
                  password: "Password and email doesn't match",
                },
              });
            }
            // else{
            //     return res.status(401).send({status: "fail", data:{user:'Unauthorized user'}})

            // }
          } else {
            return res.send({
              status: "fail",
              data: {
                email: "User not registered",
              },
            });
          }
        }
      }
    );
  }
);

router.get("/", isAdminLoggedIn, (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then((response) => {
      res.render("index", { users: response.data.data.user });
    })
    .catch((error) => {
      return res.status(400).send({ status: "error", message: error.message });
    });
});

router.get("/add_users", isAdminLoggedIn, (req, res) => {
  res.render("add_user");
});

router.get("/update_user", (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      console.log(req.query.id);
      console.log(userdata.data.data.user);
      res.render("update_user", { user: userdata.data.data.user[0] });
    })
    .catch((err) => res.json("Something went wrong"));
});

router.get("/campaigns", isAdminLoggedIn, (req, res) => {
  try {
    db.query("SELECT * From campaign_details", (error, campiagn) => {
      if (error) {
        return res.json({ status: "error", message: error.message });
      }
      res.render("campaign_index", {
        campaigns: campiagn,
      });
    });
  } catch (ex) {
    return res.json({
      status: "error",
      message: ex.message,
    });
  }
});

router.get("/blood_hospitals", isAdminLoggedIn, (req, res) => {
  db.query("Select * from blood_hospitals", (error, hospital) => {
    if (error) return res.send("Something went wrong");
    res.render("bloodBank_index", { hospitals: hospital });
  });
});

router.get("/add_campaigns", isAdminLoggedIn, (req, res) => {
  res.render("add_campaign");
});

router.get("/add_hospitals", isAdminLoggedIn, (req, res) => {
  res.render("add_hospitals");
});

router.get("/donors", isAdminLoggedIn, (req, res) => {
  try {
    db.query(
      "Select donorId, firstName, lastName, address, donorDistrict, donorContact, bloodType, dob, lastDonated from donor_details",
      async (error, result) => {
        if (error) {
          return res.json({
            status: "error",
            message: "Something went wrong",
          });
        }
        res.render("donors", { donor: result });
      }
    );
  } catch (ex) {
    return res.json({
      status: "error",
      message: "Something went wrong",
    });
  }
});

router.get("/blood_requests", isAdminLoggedIn, (req, res) => {
  try {
    db.query(
      "Select request_details.requestId, request_details.receiverName, request_details.receiverNumber, request_details.bloodType, request_details.requestStatus, user_details.firstName as userFName, user_details.lastName as userLName, donor_details.firstName, donor_details.lastName, request_details.requestedDate from request_details join user_details on request_details.requesterId = user_details.userId join donor_details on request_details.donorId = donor_details.donorId",
      async (error, request) => {
        if (error) {
          return res.json({
            status: "error",
            message: "Something went wrong",
          });
        }
        res.render("requests", { request: request });
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
});

router.get("/contributions", isAdminLoggedIn, (req, res) => {
  try {
    db.query(
      "Select money_contributions.*, user_details.firstName, user_details.lastName from money_contributions join user_details on money_contributions.userId = user_details.userId",
      (error, contributions) => {
        if (error) {
          return res.json({ status: "error", message: "Something went wrong" });
        }
        res.render("contribution", { contribution: contributions });
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: "Something went wrong" });
  }
});
router.get("/update_hospital/:id", isAdminLoggedIn, (req, res) => {
  const id = req.params.id;

  db.query(
    "Select * from blood_hospitals where bankId=?",
    [id],
    (error, results) => {
      console.log(results);
      if (error) {
        return res.send({ status: "error", message: error.message });
      } else return res.render("update_hospital", { hospital: results });
    }
  );
});

router.get("/logout", isAdminLoggedIn, (req, res) => {
  res.clearCookie("jwt");
  res.redirect("http://localhost:3000/admin/login");
});

router.get("/update_campaign/:id", isAdminLoggedIn, (req, res) => {
  const id = req.params.id;

  db.query(
    "Select * from campaign_details where campaignId=?",
    [id],
    (error, results) => {
      console.log(results);
      if (error) {
        return res.send({ status: "error", message: error.message });
      } else return res.render("update_campaign", { campaign: results });
    }
  );
});

router.post(
  "/add_campaigns",
  isAdminLoggedIn,
  campaignsAuthorization,
  validationRules(),
  (req, res) => {
    const campaignDetails = {
      campaignName: req.body.campaignName,
      campaignDetails: req.body.campaignDetails,
      campaignDistrict: req.body.campaignDistrict,
      campaignLocation: req.body.campaignLocation,
      campaignDate: req.body.campaignDate,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const param = errors.array()[0].param;
      const error = errors.array()[0].msg;
      return res.status(400).send({ status: "fail", data: { [param]: error } });
    }
    try {
      db.query(
        "Insert into campaign_details set ?",
        [campaignDetails],
        (error, campaign) => {
          if (error) {
            return res
              .status(400)
              .send({ status: "error", message: error.message });
          }

          return res.redirect("/admin/add_campaigns");
        }
      );
    } catch (ex) {
      return res.status(400).send({ status: error, message: ex.message });
    }
  }
);

router.post("/add_hospitals", isAdminLoggedIn, (req, res) => {
  console.log(req.body.location.trim());
  const location = req.body.location.toString();
  var trimmedLocation = location.replace(" ", "");
  const hospitalDetails = {
    hospitalName: req.body.hospitalName,
    hospitalContact: req.body.hospitalContact,
    hospitalAddress: req.body.hospitalAddress,
    address: req.body.address,
    location: trimmedLocation,
  };

  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //     const param = errors.array()[0].param;
  //     const error = errors.array()[0].msg;
  //     return res.status(400).send({status: "fail", data:{[param]:error}});
  // }
  try {
    db.query(
      "Insert into blood_hospitals set ?",
      [hospitalDetails],
      (error, hospital) => {
        if (error) {
          return res
            .status(400)
            .send({ status: "error", message: error.message });
        }

        return res.redirect("/admin/add_hospitals");
      }
    );
  } catch (ex) {
    return res.status(400).send({ status: error, message: ex.message });
  }
});

module.exports = router;
