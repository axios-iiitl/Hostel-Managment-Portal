const express = require("express"),
  keys = require("./config/keys"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  authRoutes = require("./routes/api/auth"),
  user = require("./routes/api/user"),
  admin = require("./routes/api/admin"),
  passport = require("passport");

require("./db/mongoose");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");

//to link statis files
app.use(express.static('./assets'))

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

app.get("/", function(req, res) {
  res.render("home", { currentUser: req.user });
});


app.use("/auth", authRoutes);
app.use("/user", user);
app.use("/admin",admin);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server up on port ${PORT} 🔥 `));
