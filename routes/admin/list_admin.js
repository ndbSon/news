var express = require('express');
var db_Trang = require("../../units/db_Trang");
var router = express.Router();

router.get("/dashboard", function(req, res) {
    if (req.isAuthenticated()) {
        Promise.all([db_Trang.BaiViet("", " * "), db_Trang.NguoiDung(""), db_Trang.ChuDe(""), db_Trang.SLX()])
            .then(rows => {
                res.render("./admin/dashboard", {
                    SoBaiViet: rows[0].length,
                    SoNguoiDung: rows[1].length,
                    SoChuDe: rows[2].length,
                    BaiViet: rows[0],
                    NguoiDung: rows[1],
                    ChuDe: rows[2],
                    SLX: rows[3],
                    user: req.user
                });
            })
    } else {
        res.redirect("../../");
    }
});

router.get("/BaiViet/show=:id", function(req, res) {
    if (req.isAuthenticated()) {
        var id = parseInt(req.params.id) || 1;
        var dau = (id - 1) * 5;
        var sql = " where TrangThai=2 || TrangThai=1 LIMIT " + 5 + " OFFSET " + dau;
        db_Trang.BaiViet(sql, " * ").then(rows => {
            res.render("./admin/BaiViet", {
                BaiViet: rows,
                show: id,

            });
        })
    } else {
        res.redirect("../../");
    }
});

router.get("/NguoiDung", function(req, res) {
    if (req.isAuthenticated()) {
        Promise.all([db_Trang.NguoiDung(""), db_Trang.TheLoai("")])
            .then(rows => {
                res.render("./admin/NguoiDung", {
                    NguoiDung: rows[0],
                    TheLoai: rows[1],
                    user: req.user
                });
            })
    } else {
        res.redirect("../../");
    }
});

router.get("/ChuyenMuc", function(req, res) {
    if (req.isAuthenticated()) {
        Promise.all([db_Trang.TheLoai(""), db_Trang.ChuDe("")])
            .then(rows => {
                res.render("./admin/ChuyenMuc", {
                    TheLoai: rows[0],
                    ChuDe: rows[1]
                });
            })
    } else {
        res.redirect("../../");
    }
});


router.get("/Tags", function(req, res) {
    res.render("./admin/Tags");
});



module.exports = router;