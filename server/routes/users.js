const express = require("express");
const db = require("../dbconfig");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { isLoggedIn } = require("../middleware/user-authentication");
const { campaignsAuthorization } = require("../middleware/authorization");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const type = upload.single("profileImage");

router.get("/", async (req, res) => {
  const table = "user_details";
  if (req.query.id) {
    const id = req.query.id;
    try {
      await db.query(
        "Select * from ?? where userId=?",
        [table, id],
        async (error, user) => {
          if (error)
            return res
              .status(400)
              .send({ status: "error", message: error.message });

          return res
            .status(200)
            .send({ status: "success", data: { user: user } });
        }
      );
    } catch (ex) {
      return res.json({ status: "error", message: ex.message });
    }
  } else {
    try {
      await db.query("Select * from ??", [table], async (error, user) => {
        if (error)
          return res
            .status(400)
            .send({ status: "error", message: error.message });

        return res
          .status(200)
          .send({ status: "success", data: { user: user } });
      });
    } catch (ex) {
      return res.status(400).send({ status: "error", message: ex.message });
    }
  }
});

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    emailAddress,
    password,
    role,
  } = req.body;
  db.query(
    "SELECT emailAddress From user_details where emailAddress = ?",
    [emailAddress],
    async (error, result) => {
      if (error) {
        return res
          .status(400)
          .send({ status: "error", message: error.message });
      }

      if (result.length > 0) {
        return res.send({ status: false, message: "User already registered." });
      } else {
        var encryptedPassword = await bcrypt.hash(password, 8);
        db.query(
          "Insert INTO user_details SET ? ",
          {
            firstName: firstName,
            lastName: lastName,
            address: address,
            emailAddress: emailAddress,
            password: encryptedPassword,
            role: role,
          },
          (error, result) => {
            if (error) return res.send(error.message);
            else {
              res.redirect("/admin/add_users");
            }
          }
        );
        //const user = {firstName: firstName, lastName:lastName, address:address, emailAddress:emailAddress, password: encryptedPassword};
      }
    }
  );
});

router.put("/", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const userDistrict = req.body.userDistrict;

    db.query(
      "Select * from user_details where userId = ?",
      [userId],
      (error, result) => {
        if (error) return res.send({ status: "error", message: error.message });

        db.query(
          "Update user_details set firstName = ?, lastName = ?, address=?, userDistrict = ? where userId = ?",
          [firstName, lastName, address, userDistrict, userId],
          (error, result) => {
            if (error)
              return res.send({ status: "error", message: error.message });

            return res.send({
              status: "success",
              data: { User: "User updated successully" },
            });
          }
        );
      }
    );
  } catch (ex) {
    return res.send({ status: "error", message: ex.message });
  }
});

router.put("/image", isLoggedIn, type, async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.send({ status: "fail", data: { image: "No image selected" } });
    }
    const userId = req.user.userId;
    const image = req.file.originalname;
    db.query(
      "Update user_details set profileImage = ? where userId = ?",
      [image, userId],
      (error, result) => {
        if (error) {
          return res.send({ status: "error", message: error.message });
        }
        return res.send({
          status: "success",
          data: { image: "Image updated successfully" },
        });
      }
    );
  } catch (ex) {
    return res.send({ status: "error", message: ex.message });
  }
});

router.post("/update", (req, res) => {
  if (!req.body) {
    return res.json({ message: "Data cant be empty" });
  }
  const id = req.body.id;
  db.query(
    "Select * from user_details where userId = ?",
    [id],
    (error, result) => {
      if (!result) {
        return res.json({ message: "No data found" });
      } else {
        db.query(
          "Update user_details set firstName='" +
            req.body.firstName +
            "',lastName='" +
            req.body.lastName +
            "',address='" +
            req.body.address +
            "',emailAddress='" +
            req.body.email +
            "',role='" +
            req.body.role +
            "' where userId=?",
          [id],
          (error, results) => {
            if (error) {
              return res.json({ message: "Something went wrong" });
            }
            return res.redirect("/admin");
          }
        );
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("Delete from user_details where userId=?", [id], (error, result) => {
    if (error) {
      return res.json({ message: "Something went wrong" });
    } else {
      return res.redirect("/admin");
    }
  });
});

module.exports = router;
