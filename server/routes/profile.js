const express = require("express");
const isLoggedIn = require("../middleware/user-authentication");

const router = express.Router();

router.get("/me", isLoggedIn.isLoggedIn, (req, res)=>{

    var user = req.user;
    res.send(user);
}
);

module.exports = router;
