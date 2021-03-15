const express = require("express");
var db = require("../dbconfig");
const router = express.Router();

const isLoggedIn = require("../middleware/user-authentication");

router.get("/", isLoggedIn.isLoggedIn, (req,res)=>{

    var location = req.user.address;
    db.query("SELECT * FROM blood_hospitals WHERE hospitalAddress = ?", [location] , (error,results)=>{
        if(results===null){
            res.status(404).send({status: false,
                user: req.user});
        }else if(results.length>0){
            res.send( results
                );
           
        }
      
    });

});

module.exports = router;