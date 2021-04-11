const express = require("express");
const db = require("../dbconfig");
const isLoggedIn = require("../middleware/user-authentication");

const router = express.Router();

router.get("/me", isLoggedIn.isLoggedIn, (req, res) => {
  var user = req.user;
  console.log(req.user);
  //res.send(user);
  const userDetails = {};
  if (user.role !== "donor") {
    userDetails.user = user;
    return res.send({ status: "success", userDetails: userDetails });
  } else {
    db.query(
      "Select * from donor_details where userId = ?",
      [user.userId],
      (error, donor) => {
        if (error) {
          return res.send({ status: "error", message: error.message });
        }
        userDetails.user = user;
        userDetails.donor = donor[0];
        return res.send({ status: "success", userDetails: userDetails });
      }
    );
  }
});

module.exports = router;
