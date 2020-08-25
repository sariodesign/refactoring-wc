// menu
const menuBtn = $('.js-nav-mobile');
const submenuBtn = $('.js-submenu-product');
const submenuBtnMobile = $('.js-open-submenu');
const backMenuBtn = $('.js-back-menu');
const subcategoryBtn = $('.js-open-subcategory');

menuBtn.on('click', function(){
  $(this).toggleClass('is-open');
  $('.o-overlay').toggleClass('is-visible');
  $('html').toggleClass('is-blocked');

  if(submenuBtnMobile.hasClass('is-selected')) {
    submenuBtnMobile.removeClass('is-selected');
  }
  
  if(backMenuBtn.hasClass('is-visible')) {
    backMenuBtn.removeClass('is-visible');
  }
});

submenuBtn.on('click', function(){
  let nextUL = $(this).next('ul');

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

submenuBtnMobile.on('click', function(){
  $(this).addClass('is-selected');
  backMenuBtn.addClass('is-visible');
});

subcategoryBtn.on('click', function(){
  let nextUL = $(this).next('ul');
  nextUL.toggleClass('is-open')
});

backMenuBtn.on('click', function(){
  if($(this).siblings('.c-navigation__label--mobile').hasClass('is-selected')){
    $('.c-navigation__label--mobile').removeClass('is-selected');
    $(this).removeClass('is-visible');
  }  
});

$('.js-scroll-top').on('click', function(){
  $('html').animate({
    scrollTop: 0
  }, 1000);
});
