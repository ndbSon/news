var express = require('express');
var db_Trang = require("../../units/db_Trang");
var router = express.Router();

router.get("/dashboard", function(req, res) {
    if (req.isAuthenticated()) {
        Promise.all([db_Trang.BaiViet("", " * "), db_Trang.NguoiDung(""), db_Trang.ChuDe(""), db_Trang.SLX(),db_Trang.TKBaiVietTheoTheLoai()])
            .then(rows => {
               
                res.render("./admin/dashboard", {
                    SoBaiViet: rows[0].length,
                    SoNguoiDung: rows[1].length,
                    SoChuDe: rows[2].length,
                    BaiViet: rows[0],
                    NguoiDung: rows[1],
                    ChuDe: rows[2],
                    SLX: rows[3],
                    TK: rows[4],
                    user: req.user
                });
            })
    } else {
        res.redirect("../../");
    }
});

router.get("/BaiViet/show=:id", function(req, res) {
    if (req.isAuthenticated()) {
        var id = parseInt(req.params.id) || 0;
        var dau = (id - 1) * 5;
        var sql = " LIMIT " + 5 + " OFFSET " + dau;
        db_Trang.BaiViet(sql, " * ").then(rows => {
            res.render("./admin/BaiViet", {
                BaiViet: rows,
                show: id,
                user: req.user,

            });
        })
    } else {
        res.redirect("../../");
    }
});

router.get('/duyetbaiviet/id=:id',(req,res)=>{
    if (req.isAuthenticated()) {
        var id = req.params.id;
        var sql = " where id = "+id;
        db_Trang.BaiViet(sql, " * ").then(rows => {
            res.render("./admin/DuyetBaiViet", {
                BaiViet: rows[0],
            });
        })

} else {
    res.redirect("../../");
}
})

router.get("/NguoiDung", function(req, res) {
    if (req.isAuthenticated()) {
        var sql = " as u, news.docgia as dg where u.ID=dg.IDUser";
        var sqlPV = " where Loai=2 ";
        var sqlBTV = " as u, news.bientapvien as btv where Loai=3 && u.ID=btv.IDUser ";
        Promise.all([db_Trang.NguoiDung(sql), db_Trang.TheLoai(""), db_Trang.NguoiDung(sqlPV), db_Trang.NguoiDung(sqlBTV)])
            .then(rows => {
                res.render("./admin/NguoiDung", {
                    DocGia: rows[0],
                    TheLoai: rows[1],
                    PV: rows[2],
                    BTV: rows[3],
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
                    ChuDe: rows[1],
                    user: req.user,
                });
            })
    } else {
        res.redirect("../../");
    }
});


router.get("/Tags", function(req, res) {
    res.render("./admin/Tags", {
        user: req.user,
    });
});



module.exports = router;