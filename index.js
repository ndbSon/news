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

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(3000);




app.get("/admin/dashboard/1", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("dashboard");
    } else {
        res.redirect("../../");
    }

});


app.get("/admin/BaiViet/1", function(req, res) {
    res.render("BaiViet");
});

app.get("/admin/NguoiDung/1", function(req, res) {
    res.render("NguoiDung");
});

app.get("/admin/ChuyenMuc/1", function(req, res) {
    res.render("ChuyenMuc");
});

app.get("/admin/Tags/1", function(req, res) {
    res.render("Tags");
});

app.get("/admin/PV/2", function(req, res) {
    res.render("PV");
});

app.get("/admin/BTV/2", function(req, res) {
    res.render("BTV");
});

app.get("/admin/VietBai_PV/2", function(req, res) {
    res.render("VietBai_PV");
});

app.post("/admin/postbaiviet", urlencodedParser, (req, res) => {
    var TieuDe = req.body.TieuDe;
    var TomTat = req.body.TomTat;
    var NoiDung = req.body.NoiDung;
    var ChuDe = req.body.ChuDe;
    console.log(NoiDung);
    db_Trang.addBaiViet(TieuDe, TomTat, NoiDung, ChuDe)
        .then(rows => {
            res.send('thanh cong r nhen');
        }).catch(err => {
            res.end('error occured.');
        });

})


app.get("/admin/account/1", function(req, res) {
    res.render("accountadmin");
});
app.get("/admin/account/2", function(req, res) {
    res.render("account");
});


app.get("/", function(req, res) {
    Promise.all([db_Trang.BaiVietXemNhieu()])
        .then(rows => {
            res.render("Trang_Chu", {
                XemNhieu: rows[0],
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
});


app.get("/:rou", (req, res) => {
    var rou = req.params.rou;
    Promise.all([db_Trang.Trang_The_Loai(rou), db_Trang.BaiVietXemNhieu()])
        .then(rows => {
            res.render("TrangTheLoai", {
                data: rows[0],
                XemNhieu: rows[1],
                TheLoai: rows[0][0].TenTheLoai
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

app.get("/ChuDe/:rou", (req, res) => {
    var rou = req.params.rou;
    Promise.all([db_Trang.Trang_Chu_De(rou), db_Trang.BaiVietXemNhieu()])
        .then(rows => {
            res.render("Trang_Chu_De", {
                data: rows[0],
                XemNhieu: rows[1],
                TheLoai: rows[0][0].TenTheLoai,
                ChuDe: rows[0][0].TenChuDe
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})
app.get("/BaiViet/:id", (req, res) => {
    var rou = req.params.rou;
    var id = req.params.id;
    Promise.all([db_Trang.Trang_Bao(id), db_Trang.BaiVietXemNhieu(), db_Trang.addLuotXem(id)])
        .then(rows => {
            res.render("Trang_Bao", {
                data: rows[0][0],
                XemNhieu: rows[1],
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

//Bình Luận còn sửa

app.get("/SQ/page", function(req, res) {
    res.render('page');
});

app.post("/SQ/addBinhLuan", urlencodedParser, (req, res) => {
    var nd = req.body.message;
    var ID = req.body.ID;
    db_Trang.addBinhLuan(nd, 2, ID)
        .then(rows => {
            res.redirect("../../BaiViet/" + ID);
        }).catch(err => {
            res.end('error occured.')
        });

})


//sign in

app.get('/account/is-available', (req, res) => {
    var user = req.query.Signusername;
    db_Trang.singleByUserName(user).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
})

app.post("/SQ/signin/1", urlencodedParser, (req, res) => {
    var Signusername = req.body.Signusername;
    var Signpassword = req.body.Signpassword;
    db_Trang.addQuanTri(Signusername, Signusername, Signpassword, 1)
        .then(rows => {
            res.redirect("../../");
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });

})



//login facebook


app.get("/auth/fb/cb", passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/admin/dashboard/1'
}));
app.get("/auth/fb/1", passport.authenticate('facebook', { scope: ['email'] }));

passport.use(new passportfb({
        clientID: "380139526042888",
        clientSecret: "62d564aed56aecbd6d8e959f227cc71e",
        callbackURL: "http://localhost:3000/auth/fb/cb",
        profileFields: ['email', 'gender', 'locale', 'displayName']
    },
    (accessToken, refreshToken, profile, done) => {
        if (username == 1 && password == 1) {
            return done(null, 1);
        } else {
            return done(null, false);
        }
    }
))



////////////////////////////
//login 

app.post("/SQ/login/1", passport.authenticate('local', {
    failureRedirect: '/11',
    successRedirect: "/admin/dashboard/1"
}));
passport.use(new LocalStrategy((username, password, done) => {
    db_Trang.listAcount(username).then(rows => {
        if (rows.length < 0) {
            return done(null, false);
        } else {
            if (rows[0].MatKhau == password) {
                return done(null, username);
            } else {
                return done(null, false);
            }
        }

    })

}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    db_Trang.listAcount(user).then(rows => {
        if (rows.length > 0) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    })
})