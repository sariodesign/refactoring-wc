// menu
const menuBtn = $('.js-nav-mobile');

menuBtn.on('click', function(){
  $('.o-overlay').toggleClass('is-visible');
});

$(document).ready(function(){
  $('.js-scroll-top').on('click', function(){
    $('html').animate({
      scrollTop: 0
    }, 1000);
  })
});
