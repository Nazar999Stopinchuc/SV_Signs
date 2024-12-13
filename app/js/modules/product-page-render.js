import Swiper from 'swiper/bundle';

function productPageRender() {
  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
  let productsData = [];

  function moveToStartImmutable(array, value) {
    return array.includes(value)
      ? [value, ...array.filter(item => item !== value)]
      : array;
  };

  function getParametrURL(parametr) {
    const urlParametr = new URLSearchParams(window.location.search);
    return urlParametr.get(parametr);
  };

  async function getProducts() {
    try {

      if (!productsData.length) {
        const res = await fetch('../data/products.json');

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        productsData = await res.json();
      }

      loadProductDetails(productsData);

    } catch (error) {
      console.log(error)
    }
  };

  function loadProductDetails(data) {
    if (!data || !data.length) {
      return;
    }

    const productId = Number(getParametrURL('id'));

    if (!productId) {
      return;
    }

    const findProduct = data.find(card => card.id === productId);

    renderSlider(findProduct);
    renderConstructor(findProduct);
  };

  function renderSlider(product) {
    const mainSliderWrapper = document.querySelector('.mySwiper2 .swiper-wrapper');
    const thumbSliderWrapper = document.querySelector('.mySwiper .swiper-wrapper');
    const productDescr = document.querySelector('.product__deskr');
    const brokerage = getParametrURL('brokerage');
    const imgs = Object.keys(product.img);

    const filteredImgs = moveToStartImmutable(imgs, brokerage);

    filteredImgs.forEach((item) => {
      const mainSlide = `
      <div class="swiper-slide">
        <img src="${(product.img)[item]}">
      </div>
    `;

      mainSliderWrapper.insertAdjacentHTML('beforeend', mainSlide);
      thumbSliderWrapper.insertAdjacentHTML('beforeend', mainSlide);

      swiper.update();
      swiper2.update();
    });

    productDescr.textContent = product.descr;
  };

  function renderConstructor(product) {
    const title = document.querySelector('.product__title');
    const descr = document.querySelector('.product__descr-short');
    const fields = [
      { key: 'size', element: document.querySelector('#size-select') },
      { key: 'material', element: document.querySelector('#material-select') },
      { key: 'lamination', element: document.querySelector('#lamination-select') },
      { key: 'grommets', element: document.querySelector('#grommets-select') },
      { key: 'printed-sides', element: document.querySelector('#printed_sides-select') },
      { key: 'riding-style', element: document.querySelector('#riding-style') },
      { key: 'colour', element: document.querySelector('#colour') },
      { key: 'type', element: document.querySelector('#type') },
      {
        key: 'frames',
        element: document.querySelector('#frames-select'),
        isComplex: true,
      },
      {
        key: 'wire-stakes',
        element: document.querySelector('#wire_stakes-select'),
        isComplex: true,
      },
      {
        key: 'reface',
        element: document.querySelector('#reface'),
        isComplex: true,
      }
    ];


    title.textContent = product.title || "Title missing";
    descr.textContent = product.descr_short || "Description is missing";

    fields.forEach(({ key, element, isComplex }) => {
      const optionsContainer = element.querySelector('.product__select-options');
      const input = element.querySelector('.product__input');
      const span = element.querySelector('span');

      optionsContainer.innerHTML = '';

      if (product[key].length == 0) {
        element.style.display = 'none';
        return;
      };


      const defaultValue = isComplex ? product[key][0].title : product[key][0];
      input.value = defaultValue;
      span.textContent = defaultValue;

      product[key].forEach(item => {
        const value = isComplex ? item.title : item;
        const imgSrc = isComplex ? item.img : '#';

        const optionHTML = `
        <li class="product__select-option">
          <article class="product__card" data-value="${value}">
            <h3 class="product__select-title">${value}</h3>
            <div class="product__img-box">
            <img src="${imgSrc}" alt="" class="product__select-img" onerror="this.style.display='none';">
            </div>
          </article>
        </li>
      `;

        optionsContainer.insertAdjacentHTML('beforeend', optionHTML);
      });
    });
  }

  getProducts();
  swiperSlider()
};

export default productPageRender;