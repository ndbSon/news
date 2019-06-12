var express = require('express');
var db_Trang = require("../units/db_Trang");
var router = express.Router();

router.get("/", function(req, res) {
    console.log(req.user);
    Promise.all([db_Trang.BaiVietXemNhieu(), db_Trang.BaiVietMoiNhat(), db_Trang.ChuDe(""), db_Trang.TheLoai(""), db_Trang.BaiVietChuyenMuc(), db_Trang.BaiVietTrangChu(), db_Trang.BaiVietPhu()])
        .then(rows => {
            res.render("./mainpage/Trang_Chu", {
                XemNhieu: rows[0],
                MoiNhat: rows[1],
                ChuDe: rows[2],
                TheLoai: rows[3],
                ChuyenMuc: rows[4],
                TopTrangChu: rows[5],
                BaiVietPhu: rows[6],
                user: req.user
            });
        })
});


router.get("/:rou/show=:s", (req, res) => {
    var rou = req.params.rou;
    var s = parseInt(req.params.s);
    var dau = (s - 1) * 5;
    Promise.all([db_Trang.Trang_The_Loai(rou,dau), db_Trang.BaiVietXemNhieu(), db_Trang.ChuDe(""), db_Trang.TheLoai("")])
        .then(rows => {
           
            res.render("./mainpage/TrangTheLoai", {
                data: rows[0],
                XemNhieu: rows[1],
                ChuDe: rows[2],
                TheLoai: rows[3],
                TheLoai2: rows[0][0].TenTheLoai,
                ChuDe2: rows[0][0].TenChuDe,
                show:s,
                user: req.user
            });
        })
})

router.get("/:rou/page=:s", (req, res) => {
    var rou = req.params.rou;
    var s = parseInt(req.params.s);
    var dau = (s - 1) * 5;
    Promise.all([db_Trang.Trang_Chu_De(rou,dau), db_Trang.BaiVietXemNhieu(), db_Trang.ChuDe(""), db_Trang.TheLoai("")])
        .then(rows => {
            res.render("./mainpage/Trang_Chu_De", {
                data: rows[0],
                XemNhieu: rows[1],
                ChuDe: rows[2],
                TheLoai: rows[3],
                TheLoai2: rows[0][0].TenTheLoai,
                ChuDe2: rows[0][0].TenChuDe,
                show:s,
                user: req.user
            });
        })
})


router.get("/BaiViet/:id", (req, res) => {
    var rou = req.params.rou;
    var id = req.params.id;
    console.log(id);
    var user =req.user;
    Promise.all([db_Trang.Trang_Bao(id), db_Trang.BaiVietXemNhieu(), db_Trang.editLuotXem(id), db_Trang.ChuDe(""), db_Trang.TheLoai(""),db_Trang.BinhLuan(id)])
        .then(rows => {
            console.log(rows[5]);
            res.render("./mainpage/Trang_Bao", {
                data: rows[0][0],
                XemNhieu: rows[1],
                ChuDe: rows[3],
                TheLoai: rows[4],
                TheLoai2: rows[0][0].TenTheLoai,
                ChuDe2: rows[0][0].TenChuDe,
                BinhLuan:rows[5],
                user: user
            });
        })
})


module.exports = router;