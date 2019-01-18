// menu
const menuBtn = $('.js-nav-mobile');
const submenuBtn = $('.js-submenu-product');

menuBtn.on('click', function(){
  $(this).toggleClass('is-open');
  $('.o-overlay').toggleClass('is-visible');
  $('html').toggleClass('is-blocked');
});

submenuBtn.on('click', function(){
  const nextUL = $(this).next('ul');

  if($(this).hasClass('is-active')){
    nextUL.removeAttr('style').removeClass('is-exploded');
    $(this).removeClass('is-active');
  } else {
    let numberLI = nextUL.children().length;
    let heightLI = nextUL.children().outerHeight(true);
    let totalHeightUL = numberLI * heightLI;
    nextUL.css('height', totalHeightUL+'px').addClass('is-exploded');
    $(this).addClass('is-active');
  }
});

$('.js-scroll-top').on('click', function(){
  $('html').animate({
    scrollTop: 0
  }, 1000);
});
