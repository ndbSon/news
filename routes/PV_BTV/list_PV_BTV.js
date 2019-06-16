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

//////////////////////sai câu select /////////////////////////
router.get("/BTV", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 3) {
        var sql = req.user.ID;
        console.log(sql);
        db_Trang.BTV(sql).then(rows => {
            res.render("./admin/BTV", {
                BaiViet: rows,
            })
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


module.exports = router;