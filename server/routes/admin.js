const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../dbconfig");
const { isLoggedIn } = require("../middleware/user-authentication");
const { body, validationResult } = require("express-validator");
const validationRules = require("../validations/campaignvalidation");
const { campaignsAuthorization } = require("../middleware/authorization");
const router = express.Router();

router.get("/login", (req, res) => {
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
            // if(results[0].role=="admin")
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
                status: false,
                message: "Password does not match",
              });
            }
            // else{
            //     return res.status(401).send({status: "fail", data:{user:'Unauthorized user'}})

            // }
          } else {
            return res.send({
              status: false,
              message: results + "Enter a valid name or username",
            });
          }
        }
      }
    );
  }
);

router.get("/", (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then((response) => {
      res.render("index", { users: response.data.data.user });
    })
    .catch((error) => {
      return res.status(400).send({ status: "error", message: error.message });
    });
});

router.get("/add_users", (req, res) => {
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

router.get("/campaigns", (req, res) => {
  db.query("SELECT * From campaign_details", (error, campiagn) => {
    if (error) {
      return res.json({ status: "error", message: error.message });
    }
    res.render("campaign_index", {
      campaigns: campiagn,
    });
  });
});

router.get("/blood_hospitals", (req, res) => {
  db.query("Select * from blood_hospitals", (error, hospital) => {
    if (error) return res.send("Something went wrong");
    res.render("bloodBank_index", { hospitals: hospital });
  });
});

router.get("/add_campaigns", (req, res) => {
  res.render("add_campaign");
});

router.get("/add_hospitals", (req, res) => {
  res.render("add_hospitals");
});

router.get("/update_hospital/:id", (req, res) => {
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

router.get("/update_campaign/:id", (req, res) => {
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
  isLoggedIn,
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

router.post("/add_hospitals", isLoggedIn, (req, res) => {
  const hospitalDetails = {
    hospitalName: req.body.hospitalName,
    hospitalContact: req.body.hospitalContact,
    hospitalAddress: req.body.hospitalAddress,
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
