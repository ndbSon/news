var db = require("../units/db");

module.exports = {
    BaiViet: sql => {
        return db.load('SELECT * FROM news.baiviet ' + sql + '')
    },
    NguoiDung: () => {
        return db.load('SELECT * FROM news.quantri')
    },
    ChuyenMuc: () => {
        return db.load('SELECT * FROM news.theloai')
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
    addBinhLuan: (NoiDung, IDNguoiBinhLuan, IDBaiViet) => {
        return db.load('INSERT INTO `news`.`binhluan` (`NoiDung`, `IDNguoiBinhLuan`, `IDBaiViet`) VALUES ("' + NoiDung + '", "' + IDNguoiBinhLuan + '", "' + IDBaiViet + '");')
    },
    addQuanTri: (Ten, TenDangNhap, MatKhau, Loai) => {
        return db.load('INSERT INTO `news`.`quantri` (`Ten`, `TenDangNhap`, `MatKhau`, `Loai`) VALUES ("' + Ten + '", "' + TenDangNhap + '", "' + MatKhau + '", "' + Loai + '"); ')
    },
    BaiVietXemNhieu: () => {
        return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.GioDang FROM news.baiviet as bv ORDER BY bv.SoLuotXem DESC LIMIT 10')
    },
    singleByUserName: name => {
        return db.load('SELECT * FROM news.quantri where TenDangNhap ="' + name + '"')
    },
    listAcount: name => {
        return db.load('SELECT * FROM news.quantri where TenDangNhap ="' + name + '" ')
    },
    addLuotXem: ID => {
        return db.load('UPDATE `news`.`baiviet` SET `SoLuotXem` = `SoLuotXem`+1 WHERE (`ID` = "' + ID + '");')
    },
    addBaiViet: (TieuDe, TomTat, NoiDung, ChuDe) => {
        return db.load('INSERT INTO `news`.`baiviet` (`TieuDe`, `TomTat`, `HinhAnh`, `NoiDung`, `GioDang`, `TrangThai`, `SoLuotThich`, `SoLuotXem`, `DoUuTien`, `ChuDe`, `AnhDaiDien`) VALUES ("' + TieuDe + '", "' + TomTat + '", 19, ' + NoiDung + ', current_timestamp(), 1, 1, 1, 1, "' + ChuDe + '", "ádsadas");')
    },
    addTenTheLoai: (TenTheLoai) => {
        return db.load('INSERT INTO `news`.`theloai` (`TenTheLoai`) VALUES ("' + TenTheLoai + '")')
    },


}