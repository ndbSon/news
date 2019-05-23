var db = require("../units/db");

module.exports = {
    Trang_The_Loai: id => {
        return db.load('SELECT bt.TieuDe,bt.TomTat,HA.src,bt.GioDang,tlcd.TenChuDe,tlcd.TenTheLoai FROM news.baiviet as bt ,news.tlcd as tlcd, news.hinhanh as HA where news.tlcd.IDChuDe = news.bt.ChuDe and news.HA.IDBaiViet=news.bt.ID and news.tlcd.TenTheLoai like "' + id + '";');
    },
    Trang_Chu_De: id => {
        return db.load('SELECT bt.TieuDe,bt.TomTat,HA.src,bt.GioDang,tlcd.TenChuDe,tlcd.TenTheLoai FROM news.baiviet as bt ,news.tlcd as tlcd , news.hinhanh as HA where news.tlcd.IDChuDe = news.bt.ChuDe and news.HA.IDBaiViet=news.bt.ID and news.tlcd.TenChuDe like "' + id + '";');
    },
    AmNhac: () => {
        return db.load('SELECT NoiDung FROM news.baiviet where ID=4')
    }
}