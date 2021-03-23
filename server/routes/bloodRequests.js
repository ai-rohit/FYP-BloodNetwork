const express = require("express");
const isLoggedIn = require("../middleware/user-authentication");
const router = express.Router();
var db = require("../dbconfig");

router.get("/", isLoggedIn.isLoggedIn, (req, res) => {
  var userId = req.user.userId;
  var status = "pending";
  db.query(
    "SELECT requestId, receiverName FROM request_details inner join donor_details on request_details.donorId = donor_details.donorId inner join user_details on user_details.userId = donor_details.userId where user_details.userId = ? and request_details.requestStatus = ?",
    [userId, status],
    (error, results) => {
      if (error) {
        return res.send(error);
      }
      return res.send({ status: true, results: results });
    }
  );
});

router.get("/history", isLoggedIn.isLoggedIn, (req, res) => {
  try {
    var userId = req.user.userId;
    var status = ["rejected", "accepted"];
    db.query(
      "SELECT requestId, receiverName FROM request_details inner join donor_details on request_details.donorId = donor_details.donorId inner join user_details on user_details.userId = donor_details.userId where user_details.userId = ? and (request_details.requestStatus = ? or request_details.requestStatus = ?)",
      [userId, status[0], status[1]],
      (error, results) => {
        if (error) {
          return res.send(error);
        }
        return res.send({ status: "success", results: results });
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
});

router.get("/sent", isLoggedIn.isLoggedIn, (req, res) => {
  try {
    var userId = req.user.userId;
    db.query(
      "SELECT * FROM request_details where requesterId=?",
      [userId],
      (error, results) => {
        if (error) {
          return res.send(error);
        }
        return res.send({ status: "success", results: results });
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
});

router.get("/details/:requestId", isLoggedIn.isLoggedIn, (req, res) => {
  var reqId = req.params.requestId;
  db.query(
    "Select * from request_details where requestId = ?",
    [reqId],
    (error, result) => {
      if (error) {
        return res.send({ status: false, message: "Something went wrong" });
      }
      if (result.length < 1) {
        return res.send({
          status: "empty",
          message: "The request might have been deleted",
        });
      }
      return res.send({ status: true, result: result });
    }
  );
});

router.put("/accept/:requestId", isLoggedIn.isLoggedIn, (req, res) => {
  var reqId = req.params.requestId;
  var donorResponse = req.body.donorResponse;
  const reqStatus = "accepted";
  db.query(
    "Update request_details set requestStatus = ?, donorResponse=? where requestId=?",
    [reqStatus, donorResponse, reqId],
    (error, result) => {
      if (error) {
        return res.send({ status: false, message: "Something went wrong" });
      }
      return res.send({
        status: true,
        result: result,
        message: "Request Accepted",
      });
    }
  );
});

router.put("/reject/:requestId", isLoggedIn.isLoggedIn, (req, res) => {
  var reqId = req.params.requestId;
  var donorResponse = req.body.donorResponse;
  const reqStatus = "rejected";

  console.log("id: ", reqId);
  db.query(
    "Select * from request_details where requestId = ?",
    [reqId],
    (error, result) => {
      console.log(result);
    }
  );
  db.query(
    "Update request_details set requestStatus = ?, donorResponse=? where requestId=?",
    [reqStatus, donorResponse, reqId],
    (error, result) => {
      if (error) {
        return res.send({ status: false, message: "Something went wrong" });
      }
      return res.send({
        status: true,
        result: result,
        message: "Request Rejected",
      });
    }
  );
});

router.put(
  "/donated/:requestId/:donorId",
  isLoggedIn.isLoggedIn,
  (req, res) => {
    var reqId = req.params.requestId;
    var donorId = req.params.donorId;
    const reqStatus = "donated";
    db.query(
      "Update request_details set requestStatus = ? where requestId=?",
      [reqStatus, reqId],
      (error, result) => {
        if (error) {
          return res.send({ status: false, message: "Something went wrong" });
        }
        var donationDate = new Date();
        db.query(
          "Update donor_details set lastDonated = ?, numOfDonation = numOfDonation + 1 where donorId=?",
          [donationDate, donorId],
          (error, result) => {
            if (error) {
              return res.send({
                status: false,
                message: "Something went wrong",
              });
            }
            return res.send({
              status: true,
              result: result,
              message: "Donor has donated",
            });
          }
        );
      }
    );
  }
);

router.post("/", isLoggedIn.isLoggedIn, (req, res) => {
  var requesterId = req.user.userId;
  const donorRequest = {
    receiverName: req.body.receiverName,
    receiverAddress: req.body.receiverAddress,
    requirementDays: req.body.requirementDays,
    receiverNumber: req.body.receiverNumber,
    donationDetails: req.body.donationDetails,
    donationType: req.body.donationType,
    bloodType: req.body.bloodType,
    requesterId: requesterId,
    donorId: req.body.donorId,
  };

  db.query(
    "INSERT INTO request_details SET ? ",
    donorRequest,
    (error, result) => {
      if (error) {
        res.send({
          data: error,
          message: "Something went wrong",
        });
      } else {
        res.send({
          data: result,
          message: "success",
        });
      }
    }
  );
});

module.exports = router;
