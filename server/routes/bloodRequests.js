const express = require("express");
const isLoggedIn = require("../middleware/user-authentication");
const router = express.Router();
var db = require("../dbconfig");
const { body, param, validationResult } = require("express-validator");


const status = ["pending", "accepted", "rejected", "marked donated", "donated"];

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
      "SELECT requestId, receiverName, receiverAddress, receiverNumber, requirementDays, donationType, request_details.bloodType, donorResponse, requestStatus FROM request_details inner join donor_details on request_details.donorId = donor_details.donorId inner join user_details on user_details.userId = donor_details.userId where user_details.userId = ? and (request_details.requestStatus != ?)",
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
      "SELECT donor_details.firstName, donor_details.lastName, donor_details.address, donorDistrict, donorContact, showContact, requestStatus, donorResponse, donationDetails, requestId, request_details.bloodType FROM request_details join donor_details on donor_details.donorId = request_details.donorId join user_details on donor_details.donorId = user_details.userId where requesterId=?",
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

router.put("/mark_donated/:requestId", isLoggedIn.isLoggedIn, 
[param("requestId").custom(async (value)=>{
  try{
    await db.query("Select * from request_details where requestId = ?", [value], (error, request)=>{
      if(!request){
        throw new Error("Request Not found");
      }
      return false;
    })
  }catch(ex){
    throw new Error(ex.message);
  }
})],
async (req, res)=>{
  const reqId = req.params.requestId;
  const reqStatus = req.body.decision;

  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    const param = errors.array()[0].param;
    return res.json({status:"fail", data:{[param]: errors.array()[0].msg}});
  }

  try{
  await db.query("Update request_details set requestStatus = ? where requestId = ?", [reqStatus, reqId], async(error, result)=>{
    if(error){
      return res.json({status:"error", message:error.message})
    }
    console.log(result);
    return res.send({status:"success", data:{request:result}})
    
  })
}catch(ex){
  return res.send({status:"error", message:ex.message})
}
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
