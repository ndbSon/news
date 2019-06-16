    var db = require("../units/db");

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
        Search: (sql) => {
            return db.load('SELECT * FROM baiviet as bv WHERE MATCH(bv.TieuDe,bv.NoiDung,bv.TomTat) AGAINST("' + sql + '" IN NATURAL LANGUAGE MODE )')
        },
        BTV: (sql) => {
            return db.load('SELECT bv.ID,bv.TieuDe,cd.TenChuDe,tl.TenTheLoai,u.TenDangNhap,bv.GioDang,bv.TrangThai FROM news.baiviet as bv ,news.chude as cd, news.theloai as tl, news.user as u, news.bientapvien as btv where news.cd.TenChuDe = news.bv.ChuDe and news.cd.IDTheLoai=news.tl.ID and u.ID=bv.TacGia and news.tl.ID=btv.IDTheLoai and btv.IDUser= ' + sql + '')
        },
        Tag: () => {
            return db.load('SELECT bv.TieuDe, t.TenTags FROM tags as t, items as i, baiviet as bv where t.ID = i.Tag_ID  and bv.ID=i.BV_ID')
        },
        BinhLuan: (IDBaiViet) => {
            return db.load('SELECT u.TenDangNhap,bl.GioBinhLuan,bl.NoiDung FROM news.binhluan as bl,news.user as u where bl.IDNguoiBinhLuan=u.ID  and bl.IDBaiViet= ' + IDBaiViet + '')
        },
        SLX: () => {
            return db.load('select sum(bv.SoLuotXem) as SoLuotXem from baiviet as bv')
        },
       
        TKBaiVietTheoTheLoai: () => {
            return db.load('select tl.TenTheLoai as tenchude,count(*) as slbv from baiviet as bv,chude as cd,theloai as tl where bv.ChuDe=cd.TenChuDe and cd.IDTheLoai=tl.ID group by tl.TenTheLoai')
        },
        Quyen: () => {
            return db.load('select * from user as u,docgia as dg where dg.IDUser=u.ID ')
        },

        Trang_The_Loai: (id, show) => {
            return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TacGia,bv.SoLuotXem,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,cd.TenChuDe,tl.TenTheLoai FROM news.baiviet as bv ,news.chude as cd, news.theloai as tl where news.cd.TenChuDe = news.bv.ChuDe and news.cd.IDTheLoai=news.tl.ID  and news.tl.TenTheLoai like  "' + id + '" LIMIT 3 OFFSET ' + show + ' ;');
        },
        Trang_Chu_De: (id, show) => {
            return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TomTat,bv.TacGia,bv.SoLuotXem,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,cd.TenChuDe,tl.TenTheLoai FROM news.baiviet as bv ,news.chude as cd, news.theloai as tl where news.cd.TenChuDe = news.bv.ChuDe and news.cd.IDTheLoai=news.tl.ID  and news.cd.TenChuDe like  "' + id + '" LIMIT 3 OFFSET ' + show + ' ;');
        },
        Trang_Bao: id => {
            return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.SoLuotXem,bv.TacGia,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.NoiDung,bv.ChuDe,tl.TenTheLoai FROM news.baiviet as bv,news.chude as cd, news.theloai as tl where cd.TenChuDe=bv.ChuDe and cd.IDTheLoai=tl.ID and bv.ID=' + id + '')
        },
        Trang_Tags: id => {
            return db.load('SELECT * FROM news.tags as t,news.baiviet as bv where t.IDBaiViet=bv.ID')
        },
        BaiVietXemNhieu: () => {
            return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TacGia,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.ChuDe FROM news.baiviet as bv ORDER BY bv.SoLuotXem DESC LIMIT 10')
        },

        BaiVietCungChuyenMuc: () => {
            return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TacGia,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.ChuDe from baiviet as bv,chude as cd where bv.ChuDe=cd.TenChuDe ')
        },

        BaiVietMoiNhat: () => {
            return db.load('SELECT bv.ID,bv.AnhDaiDien,bv.TieuDe,bv.TacGia,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.ChuDe FROM news.baiviet as bv ORDER BY bv.GioDang DESC LIMIT 10')
        },

        BaiVietChuyenMuc: () => {
            return db.load('SELECT TC.ID,TC.TacGia,TC.AnhDaiDien,TC.TieuDe,TC.TomTat,DATE_FORMAT(TC.GioDang,"%d/%m/%Y") as GioDang,TC.TenChuDe,TC.SoLuotXem,TC.TenTheLoai FROM (SELECT bv.ID, cd.TenChuDe, bv.SoLuotXem,bv.TieuDe,bv.TacGia,bv.GioDang,bv.TomTat,bv.AnhDaiDien,tl.TenTheLoai FROM news.theloai as tl, news.chude as cd , news.baiviet as bv where cd.TenChuDe = bv.ChuDe and tl.ID=cd.IDTheLoai order by bv.SoLuotXem desc) TC ORDER BY TC.GioDang DESC LIMIT 10')
        },

        BaiVietTrangChu: () => {
            return db.load('SELECT bv.ID,bv.ChuDe,bv.TacGia,bv.AnhDaiDien,bv.TieuDe,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.SoLuotXem FROM news.baiviet as bv order by SoLuotXem desc limit 1')
        },
        BaiVietPhu: () => {
            return db.load('SELECT bv.ID,bv.ChuDe,bv.TacGia,bv.AnhDaiDien,bv.TieuDe,bv.TomTat,DATE_FORMAT(bv.GioDang,"%d/%m/%Y") as GioDang,bv.SoLuotXem FROM news.baiviet as bv order by TieuDe limit 2')
        },


        singleByUserName: name => {
            return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
        },
        listAcount: name => {
            return db.load('SELECT * FROM news.user where TenDangNhap ="' + name + '"')
        },
        addBinhLuan: (NoiDung, IDNguoiBinhLuan, IDBaiViet) => {
            return db.load('INSERT INTO `news`.`binhluan` (`NoiDung`, `IDNguoiBinhLuan`, `IDBaiViet`,`GioBinhLuan`) VALUES ("' + NoiDung + '", "' + IDNguoiBinhLuan + '", "' + IDBaiViet + '" , current_timestamp());')
        },
        addUser: (TenDangNhap, MatKhau) => {
            return db.load(' INSERT INTO `news`.`user` (`TenDangNhap`, `MatKhau`,`Loai`) VALUES ("' + TenDangNhap + '", "' + MatKhau + '",1); ')
        },

        addBaiViet: (TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, TacGia) => {
            return db.load('INSERT INTO `news`.`baiviet` (`TieuDe`, `TomTat`, `HinhAnh`, `NoiDung`, `GioDang`, `TrangThai`, `SoLuotThich`, `SoLuotXem`, `Tags`, `ChuDe`,`AnhDaiDien`,`TacGia`) VALUES ("' + TieuDe + '", "' + TomTat + '", 19, ' + NoiDung + ', current_timestamp(), 3, 1, 1, 1, "' + ChuDe + '", "' + AnhDaiDien + '","' + TacGia + '");')
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
        editLuotXem: ID => {
            return db.load('UPDATE `news`.`baiviet` SET `SoLuotXem` = `SoLuotXem`+1 WHERE (`ID` = "' + ID + '");')
        },
        editTenTheLoai: (TenTheLoai, ID) => {
            return db.load('UPDATE `news`.`theloai` SET `TenTheLoai` = "' + TenTheLoai + '" WHERE (`ID` = ' + ID + ');')
        },
        editTenChuDe: (TenChuDe, IDTenTheLoai, ID) => {
            return db.load('UPDATE `news`.`chude` SET `TenChuDe` = "' + TenChuDe + '",`IDTheLoai`=' + IDTenTheLoai + ' WHERE (`ID` = ' + ID + ');')
        },
        editBaiViet: (TieuDe, TomTat, NoiDung, ChuDe, AnhDaiDien, ID) => {
            return db.load('UPDATE `news`.`baiviet` SET `TieuDe` = "' + TieuDe + '", `TomTat` = "' + TomTat + '", `NoiDung` = ' + NoiDung + ', `GioDang` = current_timestamp(), `TrangThai` = 3, `SoLuotThich` = 1, `SoLuotXem` = 1, `Tags` = 1, `ChuDe` = "' + ChuDe + '", `AnhDaiDien` = "' + AnhDaiDien + '"  WHERE (`ID` = ' + ID + ');')
        },
        editDuyetBaiViet: (TrangThai, ID,GioDang) => {
            return db.load('UPDATE `news`.`baiviet` SET `TrangThai` = ' + TrangThai + ', `GioDang` = "' + GioDang + '" WHERE (`ID` = ' + ID + ');')
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
    }