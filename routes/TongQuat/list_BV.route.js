var express = require('express');
var list_BVmodel = require("../../model/list_BV.model");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();

router.get("/", function(req, res) {
    list_BVmodel.editTrangThai().then(rows => {
        list_BVmodel.editQuyen().then(rows => {
            list_BVmodel.GiamQuyen().then(rows => {
                Promise.all([list_BVmodel.BaiVietXemNhieu(), list_BVmodel.BaiVietMoiNhat(), list_BVmodel.ChuDe(""), list_BVmodel.TheLoai(""), list_BVmodel.BaiVietChuyenMuc(), list_BVmodel.BaiVietTrangChu(), list_BVmodel.BaiVietPhu(), list_BVmodel.Tag()])
                    .then(rows => {
                        res.render("./mainpage/Trang_Chu", {
                            XemNhieu: rows[0],
                            MoiNhat: rows[1],
                            ChuDe: rows[2],
                            TheLoai: rows[3],
                            ChuyenMuc: rows[4],
                            TopTrangChu: rows[5],
                            BaiVietPhu: rows[6],
                            Tags: rows[7],
                            user: req.user,

                        });
                    })
            })
        })
    })


});
router.get("/:rou/show=:s", (req, res) => {
    var rou = req.params.rou;
    var s = parseInt(req.params.s);
    var dau = (s - 1) * 3;
    Promise.all([list_BVmodel.Trang_The_Loai(rou, dau), list_BVmodel.BaiVietXemNhieu(), list_BVmodel.ChuDe(""), list_BVmodel.TheLoai(""), list_BVmodel.Quyen(), list_BVmodel.Tag()])
        .then(rows => {
            res.render("./mainpage/TrangTheLoai", {
                data: rows[0],
                XemNhieu: rows[1],
                ChuDe: rows[2],
                TheLoai: rows[3],
                Quyen: rows[4],
                TheLoai2: rows[0][0].TenTheLoai,
                ChuDe2: rows[0][0].TenChuDe,
                Tags: rows[5],
                show: s,
                user: req.user
            });
        })
})

router.get("/:rou/page=:s", (req, res) => {
    var rou = req.params.rou;
    var s = parseInt(req.params.s);
    var dau = (s - 1) * 3;
    Promise.all([list_BVmodel.Trang_Chu_De(rou, dau), list_BVmodel.BaiVietXemNhieu(), list_BVmodel.ChuDe(""), list_BVmodel.TheLoai(""), list_BVmodel.Quyen(), list_BVmodel.Tag()])
        .then(rows => {
            res.render("./mainpage/Trang_Chu_De", {
                data: rows[0],
                XemNhieu: rows[1],
                ChuDe: rows[2],
                TheLoai: rows[3],
                Quyen: rows[4],
                TheLoai2: rows[0][0].TenTheLoai,
                ChuDe2: rows[0][0].TenChuDe,
                Tags: rows[5],
                show: s,
                user: req.user,

            });
        })
})

router.get("/BaiViet/:id", (req, res) => {
    var rou = req.params.rou;
    var id = req.params.id;
    var user = req.user;

    Promise.all([list_BVmodel.Trang_Bao(id), list_BVmodel.CungChuyenMuc(), list_BVmodel.editLuotXem(id), list_BVmodel.ChuDe(""), list_BVmodel.TheLoai(""), list_BVmodel.BinhLuan(id), list_BVmodel.Quyen(), list_BVmodel.Tag()])
        .then(rows => {
            res.render("./mainpage/Trang_Bao", {
                data: rows[0][0],
                CungChuyenMuc: rows[1],
                ChuDe: rows[3],
                TheLoai: rows[4],
                TheLoai2: rows[0][0].TenTheLoai,
                ChuDe2: rows[0][0].TenChuDe,
                BinhLuan: rows[5],
                Quyen: rows[6],
                Tags: rows[7],
                user: user
            });

        })
})

router.get("/premium/:id", (req, res) => {
    var id = req.params.id;
    var user = req.user;
    Promise.all([list_BVmodel.Trang_Premium(id), list_BVmodel.ChuDe(""), list_BVmodel.TheLoai("")])
        .then(rows => {
            res.render("./mainpage/Trang_Premium", {
                data: rows[0][0],
                ChuDe: rows[1],
                TheLoai: rows[2],
                TheLoai2: rows[0][0].TenTheLoai,
                ChuDe2: rows[0][0].TenChuDe,

                user: user,
            })
        })
})


router.post("/search", urlencodedParser, (req, res) => {
    var Searchbox = req.body.Searchbox;
    var user = req.user;
    Promise.all([list_BVmodel.Search(Searchbox), list_BVmodel.ChuDe(""), list_BVmodel.TheLoai(""), list_BVmodel.BaiVietXemNhieu(), list_BVmodel.Tag()])
        .then(rows => {
            res.render("./mainpage/search", {
                data: rows[0],
                ChuDe: rows[1],
                TheLoai: rows[2],
                Searchbox: Searchbox,
                XemNhieu: rows[3],
                Tags: rows[4],
                user: user
            })
        })
})


router.get("/Tags=:tags", urlencodedParser, (req, res) => {
    var tags = req.params.tags.trim();
    var user = req.user;
    Promise.all([list_BVmodel.Trang_Tags(tags), list_BVmodel.ChuDe(""), list_BVmodel.TheLoai(""), list_BVmodel.Tag(), list_BVmodel.BaiVietXemNhieu()])
        .then(rows => {
            res.render("./mainpage/BV_Tags", {
                data: rows[0],
                ChuDe: rows[1],
                TheLoai: rows[2],
                Tags: rows[3],
                XemNhieu: rows[4],
                tags: tags,
                user: user
            })
        })
})



////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
//Bình Luận còn sửa
router.post("/SQ/addBinhLuan", urlencodedParser, (req, res) => {
    var ID = req.body.ID;
    if (req.isAuthenticated()) {
        var nd = req.body.message;
        var nguoibinhluan = req.user.ID;
        list_BVmodel.addBinhLuan(nd, nguoibinhluan, ID)
            .then(rows => {
                res.redirect("../../BaiViet/" + ID);
            })
    } else {
        res.redirect("../../BaiViet/" + ID);
    }
})


module.exports = router;