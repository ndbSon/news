var passport = require('passport');
var passportfb = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var db_Trang = require("../units/db_Trang");

module.exports = function(app) {
    app.use(passport.initialize())
    app.use(passport.session())


    app.get("/auth/fb/1", passport.authenticate('facebook', { scope: ['email'] }));

    passport.use(new passportfb({
            clientID: "380139526042888",
            clientSecret: "62d564aed56aecbd6d8e959f227cc71e",
            callbackURL: "http://localhost:3000/auth/fb/cb",
            profileFields: ['email', 'gender', 'locale', 'displayName']
        },
        (accessToken, refreshToken, profile, done) => {
            db_Trang.listAcount(String(profile._json.name)).then(rows => {
                if (rows.length > 0) {
                    return done(null, rows[0]);
                } else {
                    db_Trang.addUser(String(profile._json.name), String(profile._json.id))
                        .then(rows => {
                            return done(null, rows[0]);
                        })
                }
            })
        }
    ))



    ////////////////////////////

    passport.use(new LocalStrategy((username, password, done) => {
        db_Trang.listAcount(username).then(rows => {
            if (rows.length === 0) {
                return done(null, false, { message: 'Invalid username.' });
            } else {
                if (rows[0].MatKhau == password) {
                    return done(null, rows[0]);
                } else {
                    return done(null, false, { message: 'Sai Mật Khẩu hoặc username' });
                }
            }
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        db_Trang.listAcount(user.TenDangNhap).then(rows => {
            if (rows.length > 0) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    })

    //login 
    app.post("/SQ/login/1", passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: "/"
    }));

    //login facebook
    app.get("/auth/fb/cb", passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

}