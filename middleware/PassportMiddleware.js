const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const keys = require("../config/keys");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: "https://hostel-managment-portal.herokuapp.com/auth/google/callback"
    },
    async function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            displayPicture: profile.photos[0].value
          });
          await user.save();
        }
        return done(err, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
