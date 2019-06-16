var express = require('express');
var db_Trang = require("../../units/db_Trang");


var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();



router.post("/BTVDuyetBaiViet", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TrangThai = req.body.Duyet;
        var id = req.body.IDBaiViet;
        console.log("Trang Thai: " + TrangThai);
        console.log("id:" + id);
        db_Trang.editDuyetBaiViet(TrangThai, id)
            .then(rows => {
                res.redirect("../../admin/BTV/2");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }
})

router.get("/VietBai_PV/id=:id", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 2) {
        var id = req.params.id;
        var sql = "where ID = " + id;
        Promise.all([db_Trang.ChuDe(), db_Trang.BaiViet(sql, " * ")]).then(rows => {
            res.render("./admin/VietBai_PV", {
                ChuDe: rows[0],
                info: rows[1][0],
                user: req.user,
            })
        })
    } else {
        res.redirect("../../");
    }
});

router.post("/postbaiviet", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var ID = req.body.ID;
        var TieuDe = req.body.TieuDe;
        var TomTat = req.body.TomTat;
        var NoiDung = "'" + String(req.body.NoiDung) + "'";
        var ChuDe = req.body.ChuDe;
        var TacGia = req.user.ID;
        var AnhDaiDien = req.body.AnhDaiDien;
        var tagabc = req.body.tagabc;
        console.log("sadsadssadsadsadsadsadsadsadsadsad " + tagabc);
        console.log(req.user.ID)
        if (!ID) {
            db_Trang.addBaiViet(TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, TacGia)
                .then(rows => {
                    res.send('thanh cong');
                }).catch(err => {
                    console.log(err);
                    res.end('error occured.');
                });
        } else {
            db_Trang.editBaiViet(TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, ID)
                .then(rows => {
                    res.send('thanh cong');
                }).catch(err => {
                    console.log(err);
                    res.end('error occured.');
                });
        }
    } else {
        res.redirect("../../");
    }
})


router.post("/BTVDuyetBaiViet", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TrangThai = req.body.Duyet;
        var GioDang = req.body.GioDang;
        var id = req.body.IDBaiViet;
        console.log("Trang Thai: " + TrangThai);
        console.log("id:" + id);
        db_Trang.editDuyetBaiViet(TrangThai, id,GioDang)
            .then(rows => {
                res.redirect("../../PV_BTV/BTV");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }
})


module.exports = router;