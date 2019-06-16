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



app.use('/', require('./routes/TongQuat/list_BV.route'))
app.use('/account', require('./routes/TongQuat/account.route'))
app.use('/admin', require('./routes/admin/list_admin'))
app.use('/admin', require('./routes/admin/func_admin'))
app.use('/PV_BTV', require('./routes/PV_BTV/list_PV_BTV'))
app.use('/PV_BTV', require('./routes/PV_BTV/func_PV_BTV'))


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

