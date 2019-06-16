    var db = require("../units/db");

    module.exports = {
        singleByUserName: name => {
            return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
        },
        addUser: (TenDangNhap, MatKhau) => {
            return db.load(' INSERT INTO `news`.`user` (`TenDangNhap`, `MatKhau`,`Loai`) VALUES ("' + TenDangNhap + '", "' + MatKhau + '",1); ')
        },
        listAcount: name => {
            return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
        },
    }