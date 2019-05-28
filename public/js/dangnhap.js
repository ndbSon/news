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
            username: {
                required: true,
                remote: {
                    url: '/account/is-available'
                }
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm: {
                required: true,
                equalTo: $('[name="password"]')
            },

        },
        messages: {
            username: {
                required: 'Your username is required.',
                remote: 'Your username has been taken, please take another.'
            },
            password: {
                required: 'Your password is required.',
                minlength: 'Your password must have at least 6 characters.'
            },
            confirm: {
                required: 'Your password does not match.',
                equalTo: 'Your password does not match.'
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