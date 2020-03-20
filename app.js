const express=require("express");
const passport=require("passport");
const mongoose=require("mongoose");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const keys=require("./config/keys");
const app=express();
const User=require("./models/User");

app.set("view engine","ejs");
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true },function(){
    console.log("connected");
});

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
done(null, user);
});

// app.use(function(req,res,next){
//     res.locals.currentUser=res.user;
//     console.log(res.locals.currentUser);
//     next();
//  });


//HOME PAGE 
app.get("/",function(req,res){
    res.render("home",{currentUser:req.user});
})

//===================================
//===================================
// GOOGLE AUTHENTICATION


passport.use(
    new GoogleStrategy({
    clientID:keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //   console.log(profile);
    User.findOne({googleId:profile.id},function(err,user){
        if(err){
            return done(err);
        }
        if(!user){
            user=new User({
                googleId:profile.id,
                name:profile.displayName
            });
            user.save(function(err){
                if(err) console.log(err);
                return done(err,user);
            });
        }else{
            return done(err,user);
        }
    })
  }
));

app.get("/auth/google",passport.authenticate('google',{
    scope:['profile','email']
}));

app.get('/auth/google/callback', passport.authenticate('google'),function(req, res) {
    res.render("landing",{currentUser:req.user});
  });

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
    res.render("home",{currentUser:req.user});
})

//===================================
//===================================



//===================================
//SERVER CONNECTION 
//===================================
app.listen(3000,function(req,res){
    console.log("Server started");
})