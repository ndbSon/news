var db = require('../units/db');

module.exports = {
    BaiViet: (sql, se) => {
        return db.load('SELECT ' + se + ' FROM news.baiviet ' + sql + '')
    },
    NguoiDung: (sql) => {
        return db.load('SELECT * FROM news.user' + sql + '')
    },
    TheLoai: (sql) => {
        return db.load('SELECT * FROM news.theloai' + sql + '')
    },
    ChuDe: (sql) => {
        return db.load('SELECT * FROM news.chude ' + sql + '')
    },
    SLX: () => {
        return db.load('select sum(bv.SoLuotXem) as SoLuotXem from baiviet as bv')
    },
   
    TKBaiVietTheoTheLoai: () => {
        return db.load('select tl.TenTheLoai as tenchude,count(*) as slbv from baiviet as bv,chude as cd,theloai as tl where bv.ChuDe=cd.TenChuDe and cd.IDTheLoai=tl.ID group by tl.TenTheLoai')
    },
    editGiahanDocGia: (ThoiGian, ID) => {
        return db.load('UPDATE `news`.`docgia` SET `ThoiGianHetHan` = "' + ThoiGian + '" WHERE (`IDUser` = ' + ID + ');')
    },
    editPhanCongBTV: (IDTheLoai, ID) => {
        return db.load('UPDATE `news`.`bientapvien` SET `IDTheLoai` = ' + IDTheLoai + ' WHERE (`IDUser` = ' + ID + ');')
    },
    editTenTheLoai: (TenTheLoai, ID) => {
        return db.load('UPDATE `news`.`theloai` SET `TenTheLoai` = "' + TenTheLoai + '" WHERE (`ID` = ' + ID + ');')
    },
    editTenChuDe: (TenChuDe, IDTenTheLoai, ID) => {
        return db.load('UPDATE `news`.`chude` SET `TenChuDe` = "' + TenChuDe + '",`IDTheLoai`=' + IDTenTheLoai + ' WHERE (`ID` = ' + ID + ');')
    },
    editDuyetBaiViet: (TrangThai, ID,GioDang) => {
        return db.load('UPDATE `news`.`baiviet` SET `TrangThai` = ' + TrangThai + ', `GioDang` = "' + GioDang + '" WHERE (`ID` = ' + ID + ');')
    },
    addTenTheLoai: (TenTheLoai) => {
        return db.load('INSERT INTO `news`.`theloai` (`TenTheLoai`) VALUES ("' + TenTheLoai + '")')
    },
    addTenTags: (TenTheLoai) => {
        return db.load('INSERT INTO `news`.`tags` (`TenTheLoai`) VALUES ("' + TenTheLoai + '")')
    },
    addTenChuDe: (TenChuDe, IDTheLoai) => {
        return db.load('INSERT INTO `news`.`chude` (`TenChuDe`,`IDTheLoai`) VALUES ("' + TenChuDe + '","' + IDTheLoai + '")')
    },
    editPhanCongBTV: (IDTheLoai, ID) => {
        return db.load('UPDATE `news`.`bientapvien` SET `IDTheLoai` = ' + IDTheLoai + ' WHERE (`IDUser` = ' + ID + ');')
    },
    editGiahanDocGia: (ThoiGian, ID) => {
        return db.load('UPDATE `news`.`docgia` SET `ThoiGianHetHan` = "' + ThoiGian + '" WHERE (`IDUser` = ' + ID + ');')
    },
    deleteTenTheLoai: (ID) => {
        return db.load('DELETE FROM `news`.`theloai` WHERE (`ID` = ' + ID + ')')

    },
    deleteTenChuDe: (ID) => {
        return db.load('DELETE FROM `news`.`chude` WHERE (`ID` = ' + ID + ')')
    },
};
