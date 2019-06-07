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


app.get("/admin/dashboard/1", function (req, res) {
    if (req.isAuthenticated()) {
        Promise.all([db_Trang.BaiViet(" "), db_Trang.NguoiDung()])
            .then(rows => {
                res.render("dashboard", {
                    SoBaiViet: rows[0].length,
                    SoNguoiDung: rows[1].length,
                    BaiViet: rows[0],
                    NguoiDung: rows[1],
                    user: req.user
                });
            })
    } else {
        res.redirect("../../");
    }
});

app.get("/admin/BaiViet/show=:id", function (req, res) {
    if (req.isAuthenticated()) {
        var id = parseInt(req.params.id) || 1;
        var dau = (id - 1) * 5;
        var sql = "LIMIT " + 5 + " OFFSET " + dau;

        db_Trang.BaiViet(sql).then(rows => {
            res.render("BaiViet", {
                BaiViet: rows,
                show: id,
                dau: dau + 5,
            });
        })
    } else {
        res.redirect("../../");
    }
});

app.get("/admin/NguoiDung/1", function (req, res) {
    if (req.isAuthenticated()) {
        Promise.all([db_Trang.NguoiDung()])
            .then(rows => {
                res.render("NguoiDung", {
                    NguoiDung: rows[1],
                    user: req.user
                });
            })
    } else {
        res.redirect("../../");
    }
});

app.get("/admin/ChuyenMuc/1", function (req, res) {
    if (req.isAuthenticated()) {
        Promise.all([db_Trang.TheLoai(""), db_Trang.ChuDe("")])
            .then(rows => {
                res.render("ChuyenMuc", {
                    TheLoai: rows[0],
                    ChuDe: rows[1]
                });
            })
    } else {
        res.redirect("../../");
    }
});


app.post("/admin/editChuDe", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenChuDe = req.body.EditTenChuDe;
        var IDTenTheLoai = req.body.EditIDTenTheLoai;
        var IDChuDe = req.body.IDChuDe;
        db_Trang.editTenChuDe(TenChuDe, IDTenTheLoai, IDChuDe)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc/1");
            })
    } else {
        res.redirect("../../");
    }
});
app.post("/admin/editTheLoai", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenTheLoai = req.body.EditTenTheLoai;
        var ID = req.body.IDTheLoai;
        db_Trang.editTenTheLoai(TenTheLoai, ID)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc/1");
            })
    } else {
        res.redirect("../../");
    }
})

app.post("/admin/addTenTheLoai", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenTheLoai = req.body.addTenTheLoai;
        db_Trang.addTenTheLoai(TenTheLoai)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc/1");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }

})

app.post("/admin/addTenChuDe", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenChuDe = req.body.addTenChuDe;
        var id = req.body.addIDTheLoai;
        db_Trang.addTenChuDe(TenChuDe, id)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc/1");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }
})



app.get("/admin/deleteTenChuDe/:id", function (req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        db_Trang.deleteTenChuDe(id)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc/1");
            })
    } else {
        res.redirect("../../");
    }
});
app.get("/admin/deleteTenTheLoai/:id", function (req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        db_Trang.deleteTenTheLoai(id)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc/1");
            })
    } else {
        res.redirect("../../");
    }
});


app.get("/admin/Tags/1", function (req, res) {
    res.render("Tags");
});



app.get("/admin/PV/2", function (req, res) {
    res.render("PV");
});

app.get("/admin/BTV/2", function (req, res) {
    res.render("BTV");
});

app.get("/admin/VietBai_PV/2", function (req, res) {
    if (req.isAuthenticated() && req.user.Loai==2) {
         res.render("VietBai_PV");
    } else {
        res.redirect("../../");
    }
});

app.post("/admin/postbaiviet", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
    var TieuDe = req.body.TieuDe;
    var TomTat = req.body.TomTat;
    var NoiDung = "'" + String(req.body.NoiDung) + "'";
    var ChuDe = req.body.ChuDe;
    var TacGia= req.user.TenDangNhap;
    console.log(req.user);
    db_Trang.addBaiViet(TieuDe, TomTat, NoiDung, ChuDe, TacGia)
        .then(rows => {
            res.send('thanh cong');
        }).catch(err => {
            console.log(err);
            res.end('error occured.');
        });
    } else {
        res.redirect("../../");
    }

})


app.get("/admin/account/1", function (req, res) {
    res.render("accountadmin");
});
app.get("/admin/account/2", function (req, res) {
    res.render("account");
});


app.get("/", function (req, res) {
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
    var mess = "";
    Promise.all([db_Trang.Trang_Bao(id), db_Trang.BaiVietXemNhieu(), db_Trang.editLuotXem(id)])
        .then(rows => {
            res.render("Trang_Bao", {
                data: rows[0][0],
                XemNhieu: rows[1],
                mess,
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

//Bình Luận còn sửa

app.get("/SQ/page", function (req, res) {
    res.render('page');
});

app.post("/SQ/addBinhLuan", urlencodedParser, (req, res) => {
    var ID = req.body.ID;
    if (req.isAuthenticated()) {
        var nd = req.body.message;
        var nguoibinhluan = req.user.ID;

        db_Trang.addBinhLuan(nd, nguoibinhluan, ID)
            .then(rows => {
                mess = "thanhcong"
                res.redirect("../../BaiViet/" + ID, { mess });
            }).catch(err => {
                res.end('error occured.')
            });
    } else {
        mess = "sadsadasdas"
        res.redirect("../../BaiViet/" + ID, { mess });
    }
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
    db_Trang.addUser(Signusername, Signpassword)
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
//login 

app.post("/SQ/login/1", passport.authenticate('local', {
    failureRedirect: '/11',
    successRedirect: "/admin/dashboard/1"
}));
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