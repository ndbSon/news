var express = require("express");
var app = express();
var db = require("./units/db");
var db_Trang = require("./units/db_Trang");
app.use(express.static("public"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.listen(3000);

app.get("/admin/account/1", function(req, res) {
    res.render("accountadmin");
});
app.get("/admin/account/2", function(req, res) {
    res.render("account");
});


app.use('/', require('./routes/list_BV.route'))
app.use('/admin', require('./routes/admin/list_admin'))
app.use('/admin', require('./routes/admin/func_admin'))
app.use('/PV_BTV', require('./routes/PV_BTV/list_PV_BTV'))
app.use('/PV_BTV', require('./routes/PV_BTV/func_PV_BTV'))

//Bình Luận còn sửa

app.get("/SQ/page", function(req, res) {
    res.render('page');
});

app.post("/SQ/addBinhLuan", urlencodedParser, (req, res) => {
    var ID = req.body.ID;
    if (req.isAuthenticated()) {
        var nd = req.body.message;
        var nguoibinhluan = req.user.ID;
        db_Trang.addBinhLuan(nd, nguoibinhluan, ID)
            .then(rows => {
                res.redirect("../../BaiViet/" + ID);
            })
    } else {
        res.redirect("../../BaiViet/" + ID);
    }
})


//sign in

app.get('/account/is-available', (req, res) => {
    var user = req.query.Signusername;
    db_Trang.singleByUserName(user).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
})

app.post("/SQ/signin/1", urlencodedParser, (req, res) => {
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

///logout
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});