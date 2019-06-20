    var db = require("../units/db");

    module.exports = {
        singleByUserName: (sql) => {
            return db.load('SELECT * FROM news.user '+sql+' ')
        },
        Max: () => {
            return db.load('SELECT max(ID) as ID FROM news.user')
        },
        addUser: (TenDangNhap, MatKhau,Loai) => {
            return db.load(' INSERT INTO `news`.`user` (`TenDangNhap`, `MatKhau`,`Loai`) VALUES ("' + TenDangNhap + '", "' + MatKhau + '",'+Loai+'); ')
        },
        addDocgia: (ID) => {
            return db.load('INSERT INTO `news`.`docgia` (`IDUser`, `ThoiGianHetHan`, `Quyen`) VALUES ('+ID+', ADDDATE(current_timestamp(), INTERVAL 7 DAY), "1");')
        },
        listAcount: name => {
            return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
        },
        editUser: (sql,id) => {
            return db.load(' UPDATE `news`.`user` SET '+sql+' WHERE (`ID` = '+id+');')
        },
    }