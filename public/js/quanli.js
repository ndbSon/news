
$(document).ready(function ($) {
    $('#table td').click(function (e) {
        /* e.preventDefault();*/
        $('#IDBaiViet').val($(this).closest('tr').find('td:nth-child(1)').text().trim());
        $('#TieuDe').val($(this).closest('tr').find('td:nth-child(2)').text().trim());
        $('#ChuDe').val($(this).closest('tr').find('td:nth-child(4)').text().trim());
        $('#NgayDang').val($(this).closest('tr').find('td:nth-child(6)').text().trim());
        $('#NoiDung').html(CKEDITOR.instances.NoiDung.setData($(this).closest('tr').find('td:nth-child(8)').find('input').val()));

    });
    $('#tableChuDe #btnSua').click(function (e) {
        /* e.preventDefault();*/
        $('#IDTenTheLoai').val($(this).closest('tr').find('td:nth-child(3)').text().trim()); //Lấy value cột thứ nhất
        $('#TenChuDe').val($(this).closest('tr').find('td:nth-child(2)').text().trim());
        $('#IDChuDe').val($(this).closest('tr').find('td:nth-child(1)').text().trim());
    });
    $('#tableTheLoai #btnSua').click(function (e) {
        /* e.preventDefault();*/
        $('#IDTheLoai').val($(this).closest('tr').find('td:nth-child(1)').text().trim());
        $('#TenTheLoai').val($(this).closest('tr').find('td:nth-child(2)').text().trim()); //Hoặc lấy giá trị cột thứ 2
    });

    $('#table #btnSua').click(function (e) {
        /* e.preventDefault();*/
        $('#EditTenTags').val($(this).closest('tr').find('td:nth-child(2)').text()); //Lấy value cột thứ nhất
        $('#IDTags').val($(this).closest('tr').find('td:nth-child(1)').text().trim());

    });

    $('#tableBTV #btnPhanCong').click(function (e) {
        /* e.preventDefault();*/
        $('#TenDangNhap').val($(this).closest('tr').find('td:nth-child(2)').text().trim()); //Lấy value cột thứ nhất
        $('#ChucVu').val($(this).closest('tr').find('td:nth-child(3)').text().trim());
        $('#IDBTV').val($(this).closest('tr').find('td:nth-child(1)').text().trim());
        $('#PhanCongTheLoai').val($(this).closest('tr').find('td:nth-child(7)').text().trim());
    });
    $('#tableND #btnGiaHan').click(function (e) {
        /* e.preventDefault();*/
        $('#TenDocGia').val($(this).closest('tr').find('td:nth-child(2)').text().trim()); //Lấy value cột thứ nhất
        $('#IDDocGia').val($(this).closest('tr').find('td:nth-child(1)').text().trim());
        $('#Ngay').val($(this).closest('tr').find('td:nth-child(3)').text().trim());
    });
    $('#tableTags #btnSua').click(function (e) {
        /* e.preventDefault();*/
        $('#EditTenTags').val($(this).closest('tr').find('td:nth-child(2)').text().trim()); //Lấy value cột thứ nhất
        $('#ID').val($(this).closest('tr').find('td:nth-child(1)').text().trim());
      
    });
});