var express = require('express');
var list_PV_BTVmodel = require("../../model/list_PV_BTV.model");
var router = express.Router();

router.get("/PV/show=:i", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 2) {
        var id = req.user.ID;
        var i = parseInt(req.params.i) || 1;
        var dau = (i - 1) * 5;
        var sql = " where TacGia= " + id + " LIMIT " + 5 + " OFFSET " + dau;
        list_PV_BTVmodel.BaiViet(sql, " * ").then(rows => {
            res.render("./admin/PV", {
                BaiViet: rows,
                show: i,
                user: req.user,
            });
        })
    } else {
        res.redirect("../../");
    }
})


router.get("/BTV", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 3) {
        var ID = req.user.ID;
        console.log(ID);
        list_PV_BTVmodel.BTV(ID).then(rows => {
            res.render("./admin/BTV", {
                BaiViet: rows,
                user: req.user,
            })
        })
    } else {
        res.redirect("../../");
    }
});

router.get('/duyetbaiviet/id=:id', (req, res) => {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        var sql = " where id = "+id;
        var user = req.user.Loai;
        list_PV_BTVmodel.BaiViet(sql, " * ").then(rows => {
            res.render("./admin/DuyetBaiViet", {
                BaiViet: rows[0],
                user:user,
            });
        })

    } else {
        res.redirect("../../");
    }
})

router.get("/LSD_BTV", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 3) {
        var ID = req.user.ID;
        list_PV_BTVmodel.listLSD_BTV(ID).then(rows => {
            res.render("./admin/LSD_BTV", {
                BaiViet: rows,
                user: req.user,
            })
        })
    } else {
        res.redirect("../../");
    }
});


module.exports = router;