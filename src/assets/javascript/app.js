// slider code
const carousel = $('.c-carousel__container');
const slide = $('.c-carousel__item');
const prevSlide = $('.js-prev-slide');
const nextSlide = $('.js-next-slide');

carousel.css('width', slide.outerWidth() * slide.length;+'px');

nextSlide.on('click', function(){
  carousel.css('left', slide.outerWidth()+'px');
  console.log(carousel.position().left);
});
