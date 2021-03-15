function campaignsAuthorization(req, res, next){
    const user = req.user;

    if(user.role==="admin"){
        return next();
    }else{
        return res.status(400).send({status: "fail", data: {user: "User unauthorized to perform action."}});
    }
}

module.exports.campaignsAuthorization = campaignsAuthorization;