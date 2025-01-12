const burger = () => {
  const burger = document.querySelector('.burger');
  const burgerClose = document.querySelector('.burger-close'); // Кнопка закрытия
  const mobileMenu = document.querySelector('.menu-mob');
  const htmlLock = document.querySelector('html');

  // Открытие меню при нажатии на .burger
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu-mob--active');

    if (mobileMenu.classList.contains('menu-mob--active')) {
      burger.classList.add('burger--active');
      htmlLock.classList.add('lock');
    } else {
      burger.classList.remove('burger--active');
      htmlLock.classList.remove('lock');
    }
  });

  // Закрытие меню при нажатии на .burger-close
  burgerClose.addEventListener('click', () => {
    mobileMenu.classList.remove('menu-mob--active');
    burger.classList.remove('burger--active');
    htmlLock.classList.remove('lock');
  });

  // Закрытие меню при нажатии на ссылку в мобильном меню
  mobileMenu.addEventListener('click', (e) => {
    let target = e.target;

    if (target.classList.contains('page-navigation__link')) {
      burger.classList.remove('burger--active');
      htmlLock.classList.remove('lock');
      mobileMenu.classList.remove('menu-mob--active');
    }
  });
};


export default burger;