var express = require('express');
var db_Trang = require("../../units/db_Trang");


var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();


router.post("/GiaHanDocGia", function(req, res) {
    if (req.isAuthenticated()) {
        var ThoiGian = String(req.body.Ngay);
        var ID = req.body.IDDocGia;
        console.log(ThoiGian);
        Promise.all([db_Trang.editGiahanDocGia(String(ThoiGian),ID)])
            .then(rows => {
                res.redirect("../../admin/NguoiDung");
            })
    } else {
        res.redirect("../../");
    }
});


router.post("/PhanCong", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var PhanCongTheLoai = req.body.PhanCongTheLoai;
        var ID = req.body.IDBTV;
        db_Trang.editPhanCongBTV(PhanCongTheLoai,ID)
            .then(rows => {
                res.redirect("../../admin/NguoiDung");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }

})


router.post("/editChuDe", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenChuDe = req.body.EditTenChuDe;
        var IDTenTheLoai = req.body.EditIDTenTheLoai;
        var IDChuDe = req.body.IDChuDe;
        db_Trang.editTenChuDe(TenChuDe, IDTenTheLoai, IDChuDe)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            })
    } else {
        res.redirect("../../");
    }
});

router.post("/editTheLoai", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenTheLoai = req.body.EditTenTheLoai;
        var ID = req.body.IDTheLoai;
        db_Trang.editTenTheLoai(TenTheLoai, ID)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            })
    } else {
        res.redirect("../../");
    }
})

router.post("/BTVDuyetBaiViet", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TrangThai = req.body.Duyet;
        var id = req.body.IDBaiViet;
        console.log("Trang Thai: " + TrangThai);
        console.log("id:" + id);
        db_Trang.editDuyetBaiViet(TrangThai, id)
            .then(rows => {
                res.redirect("../../admin/BaiViet/show=1");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }
})


router.post("/addTenTheLoai", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenTheLoai = req.body.addTenTheLoai;
        db_Trang.addTenTheLoai(TenTheLoai)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }

})

router.post("/addTenChuDe", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenChuDe = req.body.addTenChuDe;
        var id = req.body.addIDTheLoai;
        db_Trang.addTenChuDe(TenChuDe, id)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }
})



router.get("/deleteTenChuDe/:id", function(req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        db_Trang.deleteTenChuDe(id)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            })
    } else {
        res.redirect("../../");
    }
});
router.get("/deleteTenTheLoai/:id", function(req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        db_Trang.deleteTenTheLoai(id)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            })
    } else {
        res.redirect("../../");
    }
});


module.exports = router;