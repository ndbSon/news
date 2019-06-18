var db = require('../units/db');

module.exports = {
    TheLoai: (sql) => {
        return db.load('SELECT * FROM news.theloai' + sql + '')
    },
    ChuDe: (sql) => {
        return db.load('SELECT * FROM news.chude ' + sql + '')
    },
    BaiVietXemNhieu: () => {
        return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TacGia,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.ChuDe FROM news.baiviet as bv where bv.TrangThai=1 ORDER BY bv.SoLuotXem DESC LIMIT 10')
    },
    BaiVietMoiNhat: () => {
        return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TacGia,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.ChuDe FROM news.baiviet as bv where bv.TrangThai=1 ORDER BY bv.GioDang DESC LIMIT 10')
    },
    BaiVietChuyenMuc: () => {
        return db.load('SELECT TC.ID,TC.TacGia,TC.AnhDaiDien,TC.TieuDe,TC.TomTat,DATE_FORMAT(TC.GioDang,"%d/%m/%Y") as GioDang,TC.TenChuDe,TC.SoLuotXem,TC.TenTheLoai FROM (SELECT bv.ID, cd.TenChuDe, bv.SoLuotXem,bv.TieuDe,bv.TacGia,bv.GioDang,bv.TomTat,bv.AnhDaiDien,tl.TenTheLoai FROM news.theloai as tl, news.chude as cd , news.baiviet as bv where bv.TrangThai=1 and cd.TenChuDe = bv.ChuDe and tl.ID=cd.IDTheLoai order by bv.SoLuotXem desc) TC ORDER BY TC.SoLuotXem DESC LIMIT 10')
    },
    BaiVietTrangChu: () => {
        return db.load('SELECT bv.ID,bv.ChuDe,bv.TacGia,bv.AnhDaiDien,bv.TieuDe,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.SoLuotXem FROM news.baiviet as bv where bv.TrangThai=1 order by SoLuotXem desc limit 1')
    },
    BaiVietPhu: () => {
        return db.load('SELECT bv.ID,bv.ChuDe,bv.TacGia,bv.AnhDaiDien,bv.TieuDe,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.SoLuotXem FROM news.baiviet as bv where bv.TrangThai=1 order by SoLuotThich limit 2')
    },
    Tag: () => {
        return db.load('SELECT distinct * FROM tags as t')
    },
    Quyen: () => {
        return db.load('select * from user as u,docgia as dg where dg.IDUser=u.ID ')
    },
    Trang_The_Loai: (id, show) => {
        return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TacGia,bv.SoLuotXem,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,cd.TenChuDe,tl.TenTheLoai FROM news.baiviet as bv ,news.chude as cd, news.theloai as tl where bv.TrangThai=1 and news.cd.TenChuDe = news.bv.ChuDe and news.cd.IDTheLoai=news.tl.ID  and news.tl.TenTheLoai like  "' + id + '" LIMIT 3 OFFSET ' + show + ' ;');
    },
    Trang_Chu_De: (id, show) => {
        return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TomTat,bv.TacGia,bv.SoLuotXem,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,cd.TenChuDe,tl.TenTheLoai FROM news.baiviet as bv ,news.chude as cd, news.theloai as tl where bv.TrangThai=1 and news.cd.TenChuDe = news.bv.ChuDe and news.cd.IDTheLoai=news.tl.ID  and news.cd.TenChuDe like  "' + id + '" LIMIT 3 OFFSET ' + show + ' ;');
    },
    Trang_Bao: id => {
        return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.SoLuotXem,bv.TacGia,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.NoiDung,bv.ChuDe,tl.TenTheLoai FROM news.baiviet as bv,news.chude as cd, news.theloai as tl where bv.TrangThai=1 and cd.TenChuDe=bv.ChuDe and cd.IDTheLoai=tl.ID and bv.ID=' + id + '')
    },
    Trang_Tags: id => {
        return db.load('SELECT * FROM news.tags as t,news.baiviet as bv where bv.TrangThai=1 and t.IDBaiViet=bv.ID')
    },
    editLuotXem: ID => {
        return db.load('UPDATE `news`.`baiviet` SET `SoLuotXem` = `SoLuotXem`+1 WHERE (`ID` = "' + ID + '");')
    },
    addBinhLuan: (NoiDung, IDNguoiBinhLuan, IDBaiViet) => {
        return db.load('INSERT INTO `news`.`binhluan` (`NoiDung`, `IDNguoiBinhLuan`, `IDBaiViet`,`GioBinhLuan`) VALUES ("' + NoiDung + '", "' + IDNguoiBinhLuan + '", "' + IDBaiViet + '" , current_timestamp());')
    },
    BinhLuan: (IDBaiViet) => {
        return db.load('SELECT u.TenDangNhap,bl.GioBinhLuan,bl.NoiDung FROM news.binhluan as bl,news.user as u where bl.IDNguoiBinhLuan=u.ID  and bl.IDBaiViet= ' + IDBaiViet + '')
    },
    Search: (sql) => {
        return db.load('SELECT * FROM baiviet as bv WHERE bv.TrangThai=1 and MATCH(bv.TieuDe,bv.NoiDung,bv.TomTat) AGAINST("' + sql + '" IN NATURAL LANGUAGE MODE )')
    },
    editTrangThai: () => {
        return db.load('UPDATE baiviet set TrangThai=1 where TrangThai=2 and GioDang <= current_timestamp();')
    },
};