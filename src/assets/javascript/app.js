// menu
const menuBtn = $('.js-nav-mobile');

menuBtn.on('click', function(){
  $('.o-overlay').toggleClass('is-visible');
})

// slider code
const carousel = $('.c-carousel__container');
const prevSlide = $('.js-prev-slide');
const nextSlide = $('.js-next-slide');
const slide = $('.c-carousel__item');

$(window).on('load', function(){
  let allSlideWidth = slide.outerWidth(true) * slide.length;
  carousel.css('width', allSlideWidth+'px');
  slide.css('flex', '1 0 100%');
  slide.eq(0).addClass('current-slide');
  prevSlide.addClass('is-disabled');
});


$(window).resize(function() {
  carousel.removeAttr("style");
  slide.removeAttr("style");
  let allSlideWidth = slide.outerWidth(true) * slide.length;
  carousel.css('width', allSlideWidth+'px');
  slide.css('flex', '1 0 100%');
});

nextSlide.on('click', function(){
  let currentSlide = $('.current-slide');
  if((currentSlide.index() + 1) <= (slide.length - 1)){
    if((currentSlide.index() + 1) == (slide.length - 1)){
      $(this).addClass('is-disabled');
    }
    carousel.css('transform', 'translateX(-'+((currentSlide.index()+1)*100)+'%)');
    currentSlide.next().addClass('current-slide').siblings().removeClass('current-slide');
  }
  if(currentSlide.index() >= 0) {
    prevSlide.removeClass('is-disabled');
  }
});

prevSlide.on('click', function(){
  let currentSlide = $('.current-slide');
  if(currentSlide.index() >= 0){
    if(currentSlide.index() == 1){
      $(this).addClass('is-disabled');
    }
    carousel.css('transform', 'translateX(-'+(currentSlide.index()*100-100)+'%)');
    currentSlide.prev().addClass('current-slide').siblings().removeClass('current-slide');
  }
  if((currentSlide.index() + 1) <= (slide.length)){
    nextSlide.removeClass('is-disabled');
  }
});
