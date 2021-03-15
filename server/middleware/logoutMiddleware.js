module.exports.loggedOut = (req, res, next)=>{
    res.clearCookie("jwt");
    next();
};