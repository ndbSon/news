$(document).ready(function($) {

    //newstiecker
    $('#newsTicker1').breakingNews()

    //scroll
    $('.scroll').click(function() {
        $('html, body').animate({
            scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
        }, 10000);

        return false;
    });
    initComparisons();

    ////////////////////////////////

    $('#btnxacnhan').click(function() {
        alert("Ádsads");
    })
});