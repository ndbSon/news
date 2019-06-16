var db = require('../units/db');

module.exports = {
    BaiViet: (sql, se) => {
        return db.load('SELECT ' + se + ' FROM news.baiviet ' + sql + '')
    }, 
    BTV: (sql) => {
        return db.load('SELECT bv.ID,bv.TieuDe,cd.TenChuDe,tl.TenTheLoai,u.TenDangNhap,bv.GioDang,bv.TrangThai FROM news.baiviet as bv ,news.chude as cd, news.theloai as tl, news.user as u, news.bientapvien as btv where news.bv.TrangThai=3 and news.cd.TenChuDe = news.bv.ChuDe and news.cd.IDTheLoai=news.tl.ID and u.ID=bv.TacGia and news.tl.ID=btv.IDTheLoai and btv.IDUser= ' + sql + '')
    }, 
    ChuDe: (sql) => {
        return db.load('SELECT * FROM news.chude ' + sql + '')
    },
    addBaiViet: (TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, TacGia) => {
        return db.load('INSERT INTO `news`.`baiviet` (`TieuDe`, `TomTat`, `HinhAnh`, `NoiDung`, `GioDang`, `TrangThai`, `SoLuotThich`, `SoLuotXem`, `Tags`, `ChuDe`,`AnhDaiDien`,`TacGia`) VALUES ("' + TieuDe + '", "' + TomTat + '", 19, ' + NoiDung + ', current_timestamp(), 3, 1, 1, 1, "' + ChuDe + '", "' + AnhDaiDien + '","' + TacGia + '");')
    },
    editBaiViet: (TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, ID) => {
        return db.load('UPDATE `news`.`baiviet` SET `TieuDe` = "' + TieuDe + '", `TomTat` = "' + TomTat + '", `NoiDung` = ' + NoiDung + ', `GioDang` = current_timestamp(), `TrangThai` = 3, `SoLuotThich` = 1, `SoLuotXem` = 1, `Tags` = 1, `ChuDe` = "' + ChuDe + '", `AnhDaiDien` = "' + AnhDaiDien + '"  WHERE (`ID` = ' + ID + ');')
    },
    editDuyetBaiViet: (TrangThai, ID,GioDang) => {
        return db.load('UPDATE `news`.`baiviet` SET `TrangThai` = ' + TrangThai + ', `GioDang` = "' + GioDang + '" WHERE (`ID` = ' + ID + ');')
    },
    addLSD_BTV:(IDBTV,IDBaiViet,LoaiDuyet)=>{
        return db.load('INSERT INTO `news`.`lsduyet_btv` (`IDBTV`, `IDBaiViet`, `ThoiGian`, `LoaiDuyet`) VALUES ('+IDBTV+', '+IDBaiViet+', current_timestamp(), '+LoaiDuyet+');')
    },
    listLSD_BTV: (sql) => {
        return db.load('SELECT ls.*,bv.TieuDe FROM news.lsduyet_btv as ls, news.baiviet as bv where bv.ID=ls.IDBaiViet and ls.IDBTV= ' + sql + '')
    },
};
