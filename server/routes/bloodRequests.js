const express = require("express");
const isLoggedIn = require("../middleware/user-authentication");
const router = express.Router();
var db = require("../dbconfig");
const { body, param, validationResult } = require("express-validator");
const {
  sendPushNotification,
  getToken,
} = require("../middleware/notifications");

//status = ["pending", "accepted", "rejected", "marked donated", "donated", "not donated"];

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
    var status = "pending";
    db.query(
      "SELECT requestId, receiverName, receiverAddress, receiverNumber, requirementDays, donationType, request_details.bloodType, request_details.donorId, donorResponse, requestStatus, request_details.requestedDate FROM request_details inner join donor_details on request_details.donorId = donor_details.donorId inner join user_details on user_details.userId = donor_details.userId where user_details.userId = ? and (request_details.requestStatus != ?)",
      [userId, status],
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
      "SELECT donor_details.firstName, donor_details.lastName, donor_details.address, donorDistrict, donorContact, showContact, requestStatus, donorResponse, donationDetails, request_details.* FROM request_details join donor_details on donor_details.donorId = request_details.donorId join user_details on donor_details.donorId = user_details.userId where requesterId=?",
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
  "/mark_donated/:requestId",
  isLoggedIn.isLoggedIn,
  async (req, res) => {
    const reqId = req.params.requestId;
    const reqStatus = req.body.decision;

    try {
      await db.query(
        "Select * from request_details where requestId = ?",
        [reqId],
        async (error, request) => {
          if (error) {
            return res.json({ status: "error", message: error.message });
          }
          if (request.length < 1) {
            return res.json({
              status: "false",
              data: { Request: "Invalid request! It doesn't exist" },
            });
          } else {
            await db.query(
              "Update request_details set requestStatus = ? where requestId = ?",
              [reqStatus, reqId],
              async (error, result) => {
                if (error) {
                  return res.json({ status: "error", message: error.message });
                }
                console.log(result);
                return res.send({
                  status: "success",
                  data: { request: result },
                });
              }
            );
          }
        }
      );
    } catch (ex) {
      return res.send({ status: "error", message: ex.message });
    }
  }
);

router.put(
  "/not_donated/:requestId",
  isLoggedIn.isLoggedIn,
  async (req, res) => {
    const reqId = req.params.requestId;
    const reqStatus = "not donated";

    try {
      await db.query(
        "Select * from request_details where requestId = ?",
        [reqId],
        async (error, request) => {
          if (error) {
            return res.json({ status: "error", message: error.message });
          }
          if (request.length < 1) {
            return res.json({
              status: "false",
              data: { Request: "Invalid request! It doesn't exist" },
            });
          } else {
            await db.query(
              "Update request_details set requestStatus = ? where requestId = ?",
              [reqStatus, reqId],
              async (error, result) => {
                if (error) {
                  return res.json({ status: "error", message: error.message });
                }
                console.log(result);
                return res.send({
                  status: "success",
                  data: { request: result },
                });
              }
            );
          }
        }
      );
    } catch (ex) {
      return res.send({ status: "error", message: ex.message });
    }
  }
);

router.put(
  "/donated/:requestId/:donorId",
  isLoggedIn.isLoggedIn,
  (req, res) => {
    var reqId = req.params.requestId;
    var donorId = req.params.donorId;
    const reqStatus = "donated";
    const donationDate = req.body.donatedDate;
    db.query(
      "Update request_details set requestStatus = ? where requestId=?",
      [reqStatus, reqId],
      (error, result) => {
        if (error) {
          return res.send({ status: false, message: "Something went wrong" });
        }
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

router.post("/", isLoggedIn.isLoggedIn, async (req, res) => {
  var requesterId = req.user.userId;
  const donorRequest = {
    receiverName: req.body.receiverName,
    receiverAddress: req.body.receiverAddress,
    requirementDays: req.body.requirementDays,
    receiverNumber: req.body.receiverNumber,
    donationDetails: req.body.donationDetails,
    donationType: req.body.donationType,
    bloodType: req.body.bloodType,
    requestedDate: new Date(),
    requesterId: requesterId,
    donorId: req.body.donorId,
  };

  db.query(
    "INSERT INTO request_details SET ? ",
    donorRequest,
    (error, result) => {
      if (error) {
        return res.send({
          status: "error",
          data: error.message,
          message: "Something went wrong",
        });
      } else {
        res.send({
          data: result,
          status: "success",
        });
        db.query(
          "Select userId from donor_details where donorId = ?",
          [req.body.donorId],
          async (error, result) => {
            if (error) return;
            else {
              db.query(
                "Select notificationToken from user_details where userId = ?",
                [result[0].userId],
                (error, token) => {
                  if (error) return;
                  if (token[0].notificationToken) {
                    sendPushNotification(
                      (targetExpoPushToken = token[0].notificationToken),
                      (title = "New Blood Request"),
                      (message = `You got a new blood request from ${donorRequest.receiverName}`)
                    );
                  } else {
                    console.log(token[0]);
                    return;
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.put("/", (req, res) => {
  try {
    const reqDetails = req.body.request;
    db.query(
      "Select * from request_details where requestId = ?",
      [reqDetails.requestId],
      (error, request) => {
        if (error) return res.json({ status: "error", message: error.message });

        if (request.length < 1) {
          return res.json({
            status: "fail",
            data: { request: "Request not found" },
          });
        }
        db.query(
          "Update request_details set receiverName=?, receiverAddress=?, requirementDays=?, receiverNumber=?, donationDetails=?, donationType = ? where requestId=?",
          [
            reqDetails.receiverName,
            reqDetails.receiverAddress,
            reqDetails.requirementDays,
            reqDetails.receiverNumber,
            reqDetails.donationDetails,
            reqDetails.donationType,
            reqDetails.requestId,
          ],
          (error, result) => {
            if (error) {
              return res.json({ status: "error", message: error.message });
            } else {
              return res.json({
                status: "success",
                data: { request: "Request Updated" },
              });
            }
          }
        );
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
});

router.delete("/:requestId", (req, res) => {
  try {
    const reqId = req.params.requestId;
    db.query(
      "Select * from request_details where requestId = ?",
      [reqId],
      (error, request) => {
        if (error) return res.json({ status: "error", message: error.message });

        if (request.length < 1) {
          return res.json({
            status: "fail",
            data: { request: "Request not found" },
          });
        }
        db.query(
          "Delete from request_details where requestId = ?",
          [reqId],
          (error, result) => {
            if (error)
              return res.json({ status: "error", message: error.message });

            return res.json({
              status: "success",
              data: { request: "Request deleted successfully" },
            });
          }
        );
      }
    );
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
});
module.exports = router;
