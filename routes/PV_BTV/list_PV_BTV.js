var express = require('express');
var db_Trang = require("../../units/db_Trang");
var router = express.Router();

router.get("/PV/show=:i", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 2) {
        var id = req.user.ID;
        var i = parseInt(req.params.i) || 1;
        var dau = (i - 1) * 5;
        var sql = " where TacGia= " + id + " LIMIT " + 5 + " OFFSET " + dau;
        db_Trang.BaiViet(sql, " * ").then(rows => {
            res.render("./admin/PV", {
                BaiViet: rows,
                show: i,
            });
        })
    } else {
        res.redirect("../../");
    }
})

router.get("/BTV", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 3) {
        var sql = "as bv, news.user as u where bv.TrangThai=3 and u.ID=bv.TacGia";
        var se = "bv.*,u.TenDangNhap";
        Promise.all([db_Trang.BaiViet(sql, se)]).then(rows => {
            res.render("./admin/BTV", {
                BaiViet: rows[0],
            })
        })
    } else {
        res.redirect("../../");
    }
});


module.exports = router;