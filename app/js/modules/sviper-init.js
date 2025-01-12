import Swiper from 'swiper/bundle';

function sviperInit() {
  const swiper = new Swiper('.swiper-partners', {
    spaceBetween: 120,
    slidesPerView: 1,
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 2000,       
      disableOnInteraction: false, 
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1230: {
        slidesPerView: 4,
      }
    },
  });
};

export default sviperInit;