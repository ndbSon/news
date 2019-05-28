var db = require("../units/db");

module.exports = {
    Trang_The_Loai: id => {
        return db.load('SELECT bt.ID,bt.TieuDe,bt.TomTat,bt.GioDang,tlcd.TenChuDe,tlcd.TenTheLoai FROM news.baiviet as bt ,news.tlcd as tlcd where news.tlcd.TenChuDe = news.bt.ChuDe and  news.tlcd.TenTheLoai like "' + id + '";');
    },
    Trang_Chu_De: id => {
        return db.load('SELECT bt.ID,bt.TieuDe,bt.TomTat,bt.GioDang,tlcd.TenChuDe,tlcd.TenTheLoai FROM news.baiviet as bt ,news.tlcd as tlcd where news.tlcd.TenChuDe = news.bt.ChuDe and  news.tlcd.TenChuDe like "' + id + '";');
    },
    Trang_Bao: id => {
        return db.load('SELECT bt.*,tlcd.TenTheLoai FROM news.baiviet as  bt,news.tlcd as tlcd where tlcd.TenChuDe=bt.ChuDe and bt.ID=' + id + '')
    },
    addBinhLuan: (ID, NoiDung, IDNguoiBinhLuan, IDBaiViet) => {
        return db.load('INSERT INTO `news`.`binhluan` (`ID`, `NoiDung`, `IDNguoiBinhLuan`, `IDBaiViet`) VALUES ("' + ID + '", "' + NoiDung + '", "' + IDNguoiBinhLuan + '", "' + IDBaiViet + '");')
    }
}