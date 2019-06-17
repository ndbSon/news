var express = require('express');
var db_Trang = require("../../model/db_Trang");
var Usermodel = require("../../model/admin.model");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();


router.get("/account", function (req, res) {
    if (req.isAuthenticated()) {
        var ID = req.user.ID;
        Usermodel.NguoiDung(" where ID=" + ID).then(rows => {
            var mess = "";
            res.render("./admin/accountadmin", {
                mess: mess,
                NguoiDung: rows[0],
                user: req.user,
            })
        })
    } else {
        res.redirect("../../");
    }
});

///logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


router.get('/account/is-available', (req, res) => {
    var user = req.query.Signusername;
    var sql = " where TenDangNhap ='" + user + "'"
    db_Trang.singleByUserName(sql).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
})

router.post('/account', urlencodedParser, (req, res) => {
    var ID = req.body.ID;
    var MK = req.body.MK;
    var MatKhauMoi =req.body.MatKhauMoi;
    var sql = " where ID = " + ID + " and MatKhau = '" + MK + "'";
    db_Trang.singleByUserName(sql).then(rows => {
      
        if (rows.length <= 0) {
            var mess = "sai mat khau";
            Usermodel.NguoiDung(" where ID=" + ID).then(rows => {
                res.render("./admin/accountadmin", {
                    mess: mess,
                    NguoiDung: rows[0],
                    user: req.user,
                })
            })
        } else {
            var mess = "Đổi Mật Khẩu Thành Công";
            var edit="`MatKhau` = '"+MatKhauMoi+"'";
          
            Usermodel.NguoiDung(" where ID=" + ID).then(rows => {
                var NguoiDung= rows[0];
              
                db_Trang.editUser(edit,ID).then(rows=>{
                   
                    res.render("./admin/accountadmin", {
                        mess: mess,
                        NguoiDung: NguoiDung,
                        user: req.user,
                    })
                })
               
            })
        }

    })
})



router.post("/SQ/signin", urlencodedParser, (req, res) => {
    var Signusername = req.body.Signusername;
    var Signpassword = req.body.Signpassword;
    db_Trang.addUser(Signusername, Signpassword)
        .then(rows => {
            res.redirect("../../");
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})


module.exports = router;