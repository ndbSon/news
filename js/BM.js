
$(document).ready(function ($) {

  //newstiecker
  $('#newsTicker1').breakingNews()
  //scroll
  $('.scroll').click(function () {
    $('html, body').animate({
      scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 10000);

    return false;
  });
  initComparisons();
////////////////////////////////

 
$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:5
      }
  }
})

});