    var db = require("../units/db");

    module.exports = {
        singleByUserName: sql => {
            return db.load('SELECT * FROM news.user '+sql+' ')
        },
        addUser: (TenDangNhap, MatKhau) => {
            return db.load(' INSERT INTO `news`.`user` (`TenDangNhap`, `MatKhau`,`Loai`) VALUES ("' + TenDangNhap + '", "' + MatKhau + '",1); ')
        },
        listAcount: name => {
            return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
        },
        editUser: (sql,id) => {
            return db.load(' UPDATE `news`.`user` SET '+sql+' WHERE (`ID` = '+id+');')
        },

    }