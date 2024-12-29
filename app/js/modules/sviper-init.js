import Swiper from 'swiper/bundle';

function sviperInit() {
  const swiper = new Swiper('.swiper-partners', {
    spaceBetween: 120,
    slidesPerView: 4,
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 2000,       
      disableOnInteraction: false, 
    },
  });
};

export default sviperInit;