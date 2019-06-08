var db = require("../units/db");

module.exports = {
    BaiViet: sql => {
        return db.load('SELECT * FROM news.baiviet ' + sql + '')
    },
    NguoiDung: () => {
        return db.load('SELECT * FROM news.user')
    },
    TheLoai: (sql) => {
        return db.load('SELECT * FROM news.theloai' + sql + '')
    },
    ChuDe: (sql) => {
        return db.load('SELECT * FROM news.chude ' + sql + '')
    },
    Trang_The_Loai: id => {
        return db.load('SELECT bt.ID,bt.AnhDaiDien,bt.TieuDe,bt.TomTat,bt.GioDang,cd.TenChuDe,tl.TenTheLoai FROM news.baiviet as bt ,news.chude as cd, news.theloai as tl where news.cd.TenChuDe = news.bt.ChuDe and news.cd.IDTheLoai=news.tl.ID  and news.tl.TenTheLoai like  "' + id + '";');
    },
    Trang_Chu_De: id => {
        return db.load('SELECT bt.ID,bt.AnhDaiDien,bt.TieuDe,bt.TomTat,bt.GioDang,cd.TenChuDe,tl.TenTheLoai FROM news.baiviet as bt ,news.chude as cd, news.theloai as tl where news.cd.TenChuDe = news.bt.ChuDe and news.cd.IDTheLoai=news.tl.ID  and news.cd.TenChuDe like  "' + id + '";');
    },
    Trang_Bao: id => {
        return db.load('SELECT bt.*,tl.TenTheLoai FROM news.baiviet as  bt,news.chude as cd, news.theloai as tl where cd.TenChuDe=bt.ChuDe and cd.IDTheLoai=tl.ID and bt.ID=' + id + '')
    },
   
    BaiVietXemNhieu: () => {
        return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.GioDang FROM news.baiviet as bv ORDER BY bv.SoLuotXem DESC LIMIT 10')
    },
    singleByUserName: name => {
        return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
    },
    listAcount: name => {
        return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
    },
    addBinhLuan: (NoiDung, IDNguoiBinhLuan, IDBaiViet) => {
        return db.load('INSERT INTO `news`.`binhluan` (`NoiDung`, `IDNguoiBinhLuan`, `IDBaiViet`) VALUES ("' + NoiDung + '", "' + IDNguoiBinhLuan + '", "' + IDBaiViet + '");')
    },
    addUser: (TenDangNhap, MatKhau) => {
        return db.load(' INSERT INTO `news`.`user` (`TenDangNhap`, `MatKhau`,`Loai`) VALUES ("'+TenDangNhap+'", "'+MatKhau+'",1); ')
    },
    addBaiViet: (TieuDe, TomTat, NoiDung, ChuDe,AnhDaiDien,TacGia) => {
        return db.load('INSERT INTO `news`.`baiviet` (`TieuDe`, `TomTat`, `HinhAnh`, `NoiDung`, `GioDang`, `TrangThai`, `SoLuotThich`, `SoLuotXem`, `Tags`, `ChuDe`,`AnhDaiDien`,`TacGia`) VALUES ("' + TieuDe + '", "' + TomTat + '", 19, ' + NoiDung + ', current_timestamp(), 1, 1, 1, 1, "' + ChuDe + '", "'+AnhDaiDien+'","'+TacGia+'");')
    },
    addTenTheLoai: (TenTheLoai) => {
        return db.load('INSERT INTO `news`.`theloai` (`TenTheLoai`) VALUES ("' + TenTheLoai + '")')
    },
    addTenTags: (TenTheLoai) => {
        return db.load('INSERT INTO `news`.`tags` (`TenTheLoai`) VALUES ("' + TenTheLoai + '")')
    },
    addTenChuDe: (TenChuDe,IDTheLoai) => {
        return db.load('INSERT INTO `news`.`chude` (`TenChuDe`,`IDTheLoai`) VALUES ("' + TenChuDe + '","' + IDTheLoai + '")')
    },
    editLuotXem: ID => {
        return db.load('UPDATE `news`.`baiviet` SET `SoLuotXem` = `SoLuotXem`+1 WHERE (`ID` = "' + ID + '");')
    },
    editTenTheLoai: (TenTheLoai, ID) => {
        return db.load('UPDATE `news`.`theloai` SET `TenTheLoai` = "' + TenTheLoai + '" WHERE (`ID` = ' + ID + ');')
    },
    editTenChuDe: (TenChuDe,IDTenTheLoai, ID) => {
        return db.load('UPDATE `news`.`chude` SET `TenChuDe` = "' + TenChuDe + '",`IDTheLoai`='+IDTenTheLoai+' WHERE (`ID` = ' + ID + ');')
    },
    editBaiViet: (TieuDe, TomTat, NoiDung, ChuDe,AnhDaiDien,ID) => {
        return db.load('UPDATE `news`.`baiviet` SET `TieuDe` = "'+TieuDe+'", `TomTat` = "'+TomTat+'", `NoiDung` = "'+NoiDung+'", `GioDang` = current_timestamp(), `TrangThai` = 1, `SoLuotThich` = 1, `SoLuotXem` = 1, `Tags` = 1, `ChuDe` = "'+ChuDe+'", `AnhDaiDien` = "'+AnhDaiDien+'"  WHERE (`ID` = '+ID+');')
    },
    deleteTenTheLoai:(ID)=>{
        return db.load('DELETE FROM `news`.`theloai` WHERE (`ID` = '+ID+')') 
    },
    deleteTenChuDe:(ID)=>{
       return db.load('DELETE FROM `news`.`chude` WHERE (`ID` = '+ID+')') 
    },


}