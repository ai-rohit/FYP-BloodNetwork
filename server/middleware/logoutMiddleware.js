const db = require("../dbconfig");
module.exports.loggedOut = (req, res, next) => {
  const userId = req.user.userId;
  db.query(
    "Update user_details set notificationToken = ? where userId = ?",
    [null, userId],
    (error, result) => {
      if (error) {
        return res.send({ status: "error", message: error.message });
      }
      res.clearCookie("jwt");
      next();
    }
  );
};
