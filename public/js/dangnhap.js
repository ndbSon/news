// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).ready(function($) {
    //Khi bàn phím được nhấn và thả ra thì sẽ chạy phương thức này
    $('#registerForm').validate({
        rules: {
            Signusername: {
                required: true,
                remote: {
                    url: './account/account/is-available'
                }
            },
            Signpassword: {
                required: true,
                minlength: 6
            },
            confirm: {
                required: true,
                equalTo: $('#txtPassword')
            },
        },
        messages: {
            Signusername: {
                required: 'Bạn Chưa Nhập Tên',
                remote: 'Tên Đăng Nhập Đã Tồn Tại'
            },
            Signpassword: {
                required: 'Nhập Password',
                minlength: 'Password Phải Trên 6 Kí Tự'
            },
            confirm: {
                required: 'Không Trùng Với Mật Khẩu Đã Nhập',
                equalTo: 'Không Trùng Với Mật Khẩu Đã Nhập'
            },

        },
        errorElement: 'small',
        errorClass: 'help-block text-danger',
        highlight: function(e) {
            $(e).removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function(e) {
            $(e).removeClass('is-invalid').addClass('is-valid');
        }
    });

    $('#formDoiMatKhau').validate({
        rules: {
            MatKhauMoi: {
                required: true,
                minlength: 6
            },
            confirm: {
                required: true,
                equalTo: $('#MatKhauMoi')
            },
        },
        messages: {
            MatKhauMoi: {
                required: 'Nhập Password',
                minlength: 'Password Phải Trên 6 Kí Tự'
            },
            confirm: {
                required: 'Không Trùng Với Mật Khẩu Đã Nhập',
                equalTo: 'Không Trùng Với Mật Khẩu Đã Nhập'
            },

        },
        errorElement: 'small',
        errorClass: 'help-block text-danger',
        highlight: function(e) {
            $(e).removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function(e) {
            $(e).removeClass('is-invalid').addClass('is-valid');
        }
    });



})