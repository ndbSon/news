var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportfb = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();
var session = require('express-session')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret: "asad"
}))
router.use(passport.initialize())
router.use(passport.session())


//db


router.get("/SQ/login", function(req, res) {
    console.log("thanhcong1");
    res.render('login');
});
router.get("/auth/fb/cb", passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/'
}));
router.get("/auth/fb", passport.authenticate('facebook', { scope: ['email'] }));

passport.use(new passportfb({
        clientID: "380139526042888",
        clientSecret: "62d564aed56aecbd6d8e959f227cc71e",
        callbackURL: "http://localhost:3000/auth/fb/cb",
        profileFields: ['email', 'gender', 'locale', 'displayName']
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done();
    }
))
passport.serializeUser((user, done) => {
    done(null, user.id)
})


console.log("thanhcong");
router.post("/SQ/login", passport.authenticate('local', {
    failureRedirect: '/11',
    successRedirect: '/Thoi_Su'
}));
passport.use(new LocalStrategy((username, password, done) => {
    if (username == 1 && password == 1) {
        return done(null, 1);
    } else {
        return done(null, false);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    if (user == 1) {
        return done(null, user);
    } else {
        return done(null, false);
    }

})

module.exports = router;