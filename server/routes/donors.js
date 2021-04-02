const express = require("express");
const router = express.Router();

const db = require("../dbconfig");
const isLoggedIn = require("../middleware/user-authentication");

router.get("/:location/:bloodType", isLoggedIn.isLoggedIn, (req, res) => {
  var district = req.params.location;
  var bloodType = req.params.bloodType;
  var userId = req.user.userId;
  var today = new Date();
  const defaultDate = null;
  db.query(
    "SELECT * FROM donor_details inner join user_details on donor_details.userId = user_details.userId where donor_details.donorDistrict = ? and donor_details.bloodType=? and user_details.userId !=? and (datediff(?,lastDonated) > 60 or lastDonated IS ?)",
    [district, bloodType, userId, today, defaultDate],
    (error, results) => {
      if (error) {
        return res.send({ status: false, message: "Something went wrong" });
      }

      if (results.length > 0) {
        return res.send({ status: true, results: results });
      } else {
        return res.send({ message: "Not available", status: false });
      }
    }
  );
});

module.exports = router;
