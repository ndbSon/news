var express = require('express');
var db_Trang = require("../../units/db_Trang");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();


router.get("/account", function(req, res) {
    res.render("account", {
        user: req.user,
    });
});

///logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


router.get('/account/is-available', (req, res) => {
    var user = req.query.Signusername;
    db_Trang.singleByUserName(user).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
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