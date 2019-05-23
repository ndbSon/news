var express = require("express");
var app = express();
var db = require("./units/db");
var db_Trang = require("./units/db_Trang");
var bodyParser = require('body-parser');
//
var passport = require('passport');
var passportfb = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
//
var session = require('express-session')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./html");

app.use(session({
    secret: "asad"
}))
app.use(passport.initialize())
app.use(passport.session())


app.listen(3000);



app.get("/", function(req, res) {
    res.render("Trang_Chu");
});

app.get("/1/AmNhac", function(req, res) {
    db_Trang.AmNhac()
        .then(rows => {
            res.render("AmNhac", {
                data: rows[0],
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });

});

app.get("/:rou", (req, res) => {
    var i = req.params.rou;
    db_Trang.Trang_The_Loai(i)
        .then(rows => {
            console.log(rows.ChuDe);
            res.render("TrangTheLoai", {
                data: rows,
                TheLoai: rows[0].TenTheLoai
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

app.get("/ChuDe/:rou", (req, res) => {
    var i = req.params.rou;
    db_Trang.Trang_Chu_De(i)
        .then(rows => {
            res.render("Trang_Chu_De", {
                data: rows,
                TheLoai: rows[0].TenTheLoai,
                ChuDe: rows[0].TenChuDe
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})


//login facebook

app.get("/SQ/login", function(req, res) {
    res.render('login');
});
app.get("/auth/fb/cb", passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/'
}));
app.get("/auth/fb", passport.authenticate('facebook', { scope: ['email'] }));

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

////////////////////////////
//login 

app.post("/SQ/login", passport.authenticate('local', {
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