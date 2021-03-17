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

router.post("/update", (req, res)=>{
    if(!req.body){
        return res.json({message: "Data cant be empty"});
    }
    const id = req.body.id;
    db.query("Select * from blood_hospitals where bankId = ?", [id], (error, result)=>{
        if(!result){
            return res.json({message: "No data found"});
        }else{
            db.query("Update blood_hospitals set hospitalName='"+req.body.hospitalName+"',hospitalContact='"+req.body.hospitalContact+"',hospitalAddress='"+req.body.hospitalAddress+"' where bankId=?",[id],(error, results)=>{
                if(error){
                   return res.json({message: error.message});
                }
                console.log(req.body);
                return res.redirect("/admin/blood_hospitals");
            })
        }
    })
});

router.get("/delete/:id", (req, res)=>{
    const id = req.params.id;
    db.query("Select * from blood_hospitals where bankId = ?", [id], (error, result)=>{
        if(error) return res.json({status: "error", message: "Something went wrong"});
        if(!result) return res.json({status: "fail", message:"Data didn't exist"});
        db.query("Delete from blood_hospitals where bankId=?",[id], (error, result)=>{
            if(error){
                return res.json({message:"Something went wrong"});
            }else{
                return res.redirect("/admin/blood_hospitals");
            }
        }); 
    });
})

module.exports = router;