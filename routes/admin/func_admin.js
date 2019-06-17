var express = require('express');
var adminmodel = require("../../model/admin.model");


var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();


router.post("/GiaHanDocGia", function(req, res) {
    if (req.isAuthenticated()) {
        var ThoiGian = String(req.body.Ngay);
        var ID = req.body.IDDocGia;
        console.log(ThoiGian);
        Promise.all([adminmodel.editGiahanDocGia(String(ThoiGian),ID)])
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
        adminmodel.editPhanCongBTV(PhanCongTheLoai,ID)
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
        adminmodel.editTenChuDe(TenChuDe, IDTenTheLoai, IDChuDe)
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
        adminmodel.editTenTheLoai(TenTheLoai, ID)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            })
    } else {
        res.redirect("../../");
    }
})

router.post("/AdminDuyetBaiViet", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TrangThai = req.body.Duyet;
        var GioDang = req.body.GioDang;
        var id = req.body.IDBaiViet;
        console.log("Trang Thai: " + TrangThai);
        console.log("id:" + id);
        adminmodel.editDuyetBaiViet(TrangThai, id,GioDang)
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
        adminmodel.addTenTheLoai(TenTheLoai)
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
        adminmodel.addTenChuDe(TenChuDe, id)
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

router.post("/addTenTags", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenTags = req.body.addTenTags;
        var id = req.body.IDBaiViet;
        adminmodel.addTags(TenTags, id)
            .then(rows => {
                res.redirect("../../admin/Tags");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }
})
router.post("/EditTenTags", urlencodedParser, (req, res) => {
    if (req.isAuthenticated()) {
        var TenTags = req.body.EditTenTags;
        var id = req.body.ID;
        adminmodel.editTags(TenTags, id)
            .then(rows => {
                res.redirect("../../admin/Tags");
            }).catch(err => {
                console.log(err);
                res.end('error occured.');
            });
    } else {
        res.redirect("../../");
    }
})
router.get("/deleteTags/:id", function(req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        adminmodel.deleteTags(id)
            .then(rows => {
                res.redirect("../../admin/Tags");
            })
    } else {
        res.redirect("../../");
    }
});

router.get("/deleteTenChuDe/:id", function(req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        adminmodel.deleteTenChuDe(id)
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
        adminmodel.deleteTenTheLoai(id)
            .then(rows => {
                res.redirect("../../admin/ChuyenMuc");
            })
    } else {
        res.redirect("../../");
    }
});


module.exports = router;