const express = require("express");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/api/auth");
const user = require("./routes/api/user");
const admin = require("./routes/api/admin");
const passport = require("passport");
const Admin = require("./models/Admin");

require("./db/mongoose");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");

app.locals.moment = require("moment");

// to link statis files
app.use(express.static("./assets"));

app.use(
  cookieSession({
    name: "session",
    keys: [keys.sessionSecret]
  })
);

app.use(cookieParser());

require("./middleware/PassportMiddleware");

app.use(passport.initialize());

app.use(passport.session());

app.get("/", function (req, res) {
  if (req.session.token == null) {
    res.render("home", {
      currentUser: req.user,
      clientType: req.session.client
    });
  } else {
    Admin.findOne({ googleId: req.session.token }, function (err, admin) {
      if (err) Error(err);
      if (admin) {
        res.redirect("/admin/dashboard");
      } else {
        res.redirect("/user/dashboard");
      }
    });
  }
});

app.use("/auth", authRoutes);
app.use("/user", user);
app.use("/admin", admin);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server up on port ${PORT} 🔥 `));
