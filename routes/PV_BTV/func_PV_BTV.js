var express = require('express');
var list_PV_BTVmodel = require("../../model/list_PV_BTV.model");


var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();



router.get("/VietBai_PV/id=:id", function(req, res) {
    if (req.isAuthenticated() && req.user.Loai == 2) {
        var id = req.params.id;
        var sql = "where ID = " + id;
        Promise.all([list_PV_BTVmodel.ChuDe(""), list_PV_BTVmodel.BaiViet(sql, " * ")]).then(rows => {
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
            list_PV_BTVmodel.addBaiViet(TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, TacGia)
                .then(rows => {
                    res.redirect("../../PV_BTV/PV/show=1");
                }).catch(err => {
                    console.log(err);
                    res.end('error occured.');
                });
        } else {
            list_PV_BTVmodel.editBaiViet(TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, ID)
                .then(rows => {
                    res.redirect("../../PV_BTV/PV/show=1");
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
        var IDBTV = req.user.ID;
        console.log("Trang Thai: " + TrangThai);
        console.log("id:" + id);
        Promise.all([list_PV_BTVmodel.editDuyetBaiViet(TrangThai, id,GioDang),list_PV_BTVmodel.addLSD_BTV(IDBTV,id,TrangThai)])
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