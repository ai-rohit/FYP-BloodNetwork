var db = require("../dbconfig");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { fail } = require("assert");

const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        "bld_network_jwtPrivateKey"
      );

      db.query(
        "SELECT * FROM user_details WHERE userId = ?",
        [decoded.userId],
        (error, result) => {
          if (error) {
            return res
              .status(400)
              .send({ status: "error", message: error.message });
          }

          if (!result) {
            return res
              .status(400)
              .send({ status: "fail", data: { user: "User not found" } });
          }
          req.user = result[0];
          return next();
        }
      );
    } catch (err) {
      return res.status(400).send({ status: "error", message: err.message });
    }
  } else {
    return res
      .status(400)
      .send({ status: "fail", data: { user: "User not logged in" } });
  }
};

const jwtAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token)
      return res.send({ sttus: fail, data: { login: "Can't access" } });

    const data = jwt.verify(token, "bld_network_jwtPrivateKey");
    db.query(
      "SELECT * FROM user_details WHERE userId = ?",
      [data.userId],
      (error, result) => {
        if (error) {
          return res
            .status(400)
            .send({ status: "error", message: error.message });
        }

        if (!result) {
          return res
            .status(400)
            .send({ status: "fail", data: { user: "User not found" } });
        }
        req.user = result[0];
        return next();
      }
    );
  } catch (ex) {
    return res.send({ status: "error", message: ex.message });
  }
};

module.exports.isLoggedIn = isLoggedIn;
module.exports.jwtAuth = jwtAuth;
