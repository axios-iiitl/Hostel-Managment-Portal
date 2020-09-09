const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const keys = require("../config/keys");
const User = require("../models/User");
const Super_User = require("../models/Super_User");
const Admin = require("../models/Admin");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function(accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }, async function(
        err,
        user
      ) {
        if (err) {
          return done(err);
        }
        if (!user) {
          Super_User.findOne(
            { email: profile.emails[0].value },
            async (err, superuser) => {
              if (err) {
                return done(err);
              } else if (superuser) {
                superuser.accessToken.push(accessToken);
                await superuser.save();
                return done(err, superuser);
              } else {
                Admin.findOne(
                  { email: profile.emails[0].value },
                  async (err, admin) => {
                    if (err) {
                      return done(err);
                    } else if (admin) {
                      admin.accessToken.push(accessToken);
                      await admin.save();
                      return done(err, admin);
                    } else {
                      var branch = "N/A";
                      var year = "N/A";
                      var rollNo = "N/A";
                      var course = "N/A";

                      var str = profile.emails[0].value;
                      var res = str.split("@");
                      console.log(str[0]);

                      if (
                        res[1] === "iiitl.ac.in" &&
                        (str[0] === "c" ||
                          str[0] === "l" ||
                          str[0] === "r" ||
                          str[0] === "m")
                      ) {
                        if (str[0] === "l") {
                          course = "BTECH";
                        } else if (str[0] === "m") {
                          course = "MTECH";
                        } else if (str[0] === "r") {
                          course = "Ph.D";
                          year = "";
                        }

                        if (str[1] === "c") {
                          branch = "CS";
                        } else if (str[1] === "i") {
                          branch = "IT";
                        }

                        if (str[0] !== "r") {
                          year = str.slice(3, 7);
                          rollNo = res[0];
                        }
                      } else {
                        course = "N/A";
                        year = "N/A";
                        branch = "N/A";
                        rollNo = "N/A";
                      }

                      user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        displayPicture: profile.photos[0].value,
                        branch: branch,
                        year: year,
                        course: course,
                        rollNo: rollNo,
                      });
                      user.accessToken.push(accessToken);
                      try {
                        user.save();
                        return done(err, user);
                      } catch (e) {
                        return done(e);
                      }
                    }
                  }
                );
              }
            }
          );

          // }
        } else if (user) {
          user.accessToken.push(accessToken);
          await user.save();
          return done(err, user);
        }
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
