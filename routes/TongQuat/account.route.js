var express = require('express');
var db_Trang = require("../../units/db_Trang");
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



module.exports = router;