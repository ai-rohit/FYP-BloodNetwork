const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");
const fetch = require("cross-fetch");
const { post } = require("./register");
const db = require("../dbconfig");
const { isLoggedIn } = require("../middleware/user-authentication");
var KHALTI_VERIFY = "https://khalti.com/api/v2/payment/verify/";

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/payment.html"));
});

router.post("/charge", isLoggedIn, async function (req, res) {
  try {
    const user = req.user;
    const result = await axios({
      method: "post",
      url: "https://khalti.com/api/v2/payment/verify/",
      data: {
        token: await req.body.token,
        amount: await req.body.amount,
      },
      headers: {
        Authorization: `Key test_secret_key_bd43849e4bfa4bc0906c4974f7ff63d4`,
        "Content-Type": "application/json",
      },
    });
    if (result.status == 200) {
      const contributionDetails = {
        contributorName: result.data.user.name,
        contributorNumber: result.data.user.mobile,
        contributionAmount: result.data.amount / 100,
        contributionDate: result.data.created_on,
        contributionStatus: result.data.state.name,
        userId: user.userId,
      };
      db.query(
        "Insert into money_contributions set ?",
        [contributionDetails],
        (error, results) => {
          if (error) {
            return res.json({ status: "error", message: error.message });
          } else {
            console.log(results);
            return res.send({ status: "success", data: "Payment Successful" });
          }
        }
      );
    } else {
      return res.json({
        status: "error",
        message: "Sorry! Couldn't verify transaction!",
      });
    }
  } catch (error) {
    //console.log(error);
    return res.json({ status: "error", message: error.message });
  }
});
module.exports = router;
