const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const register = require("./routes/register");
const authentication = require("./routes/auth");
const requestBlood = require("./routes/bloodRequests");
const bloodBank = require("./routes/bloodBanks");
const profile = require("./routes/profile");
const donors = require("./routes/donors");
const campaigns = require("./routes/campaigns");
const path = require("path");
const admin = require("./routes/admin");
const user = require("./routes/users");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());
// app.use(helmet.contentSecurityPolicy({
//     directives:{
//         defaultSrc:["'self'"]
//     }
// }))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views"))

//load assets
app.use("/uploads", express.static("uploads"));
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/html", express.static(path.resolve(__dirname, "assets/html")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

app.use("/api/register", register);
app.use("/api/login_auth", authentication);
app.use("/api/blood_banks", bloodBank);
app.use("/api/bloodRequest", requestBlood);
app.use("/api/profile", profile);
app.use("/api/donor", donors);
app.use("/api/campaigns", campaigns);
app.use("/api/users", user);
app.use("/admin", admin);
app.use("/api/payment", require("./routes/payment"));

app.listen(3000, () => console.log("listening to 3000"));
