const GoogleStrategy = require("passport-google-oauth20").Strategy,
  passport = require("passport"),
  keys = require("../config/keys"),
  User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName
          });
        }

        user.save(function(err) {
          if (err) console.log(err);
          return done(err, user);
        });
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
