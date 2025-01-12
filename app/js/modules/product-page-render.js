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

  function getParametrURL(parametr) {
    const urlParametr = new URLSearchParams(window.location.search);
    return urlParametr.get(parametr);
  };

  async function getProducts() {
    try {

      if (!productsData.length) {
        const res = await fetch('./data/products.json');

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


    mainSliderWrapper.innerHTML = '';
    thumbSliderWrapper.innerHTML = '';

 
    if (brokerage && product.img[brokerage]) {
      const mainSlide = `
        <div class="swiper-slide">
          <img src="${product.img[brokerage]}">
        </div>
      `;

      mainSliderWrapper.insertAdjacentHTML('beforeend', mainSlide);
      thumbSliderWrapper.insertAdjacentHTML('beforeend', mainSlide);
    } else {
  
      imgs.forEach((item) => {
        const mainSlide = `
            <div class="swiper-slide">
              <img src="${product.img[item]}">
            </div>
          `;

        mainSliderWrapper.insertAdjacentHTML('beforeend', mainSlide);
        thumbSliderWrapper.insertAdjacentHTML('beforeend', mainSlide);
      });
    }


    swiper.update();
    swiper2.update();


    productDescr.textContent = product.descr;
  }

  function renderConstructor(product) {
    const title = document.querySelector('.product__title');
    const descr = document.querySelector('.product__descr-short');
    const fieldsContainer = document.querySelector('.product__fields'); 

    fieldsContainer.innerHTML = '';


    title.textContent = product.title || "Title missing";
    descr.textContent = product.descr_short || "Description is missing";

    const fields = [
      { key: 'size', label: 'Size', isComplex: false, isPredefined: true }, // Указываем, что "size" уже существует
      { key: 'material', label: 'Material', isComplex: false },
      { key: 'lamination', label: 'Lamination', isComplex: false },
      { key: 'grommets', label: 'Grommets', isComplex: false },
      { key: 'printed-sides', label: 'Printed Sides', isComplex: false },
      { key: 'riding-style', label: 'Riding Style', isComplex: false },
      { key: 'colour', label: 'Colour', isComplex: false },
      { key: 'type', label: 'Type', isComplex: false },
      { key: 'frames', label: 'Frames', isComplex: true },
      { key: 'wire-stakes', label: 'Wire Stakes', isComplex: true },
      { key: 'reface', label: 'Reface', isComplex: true },
      { key: 'flag-pole', label: 'Flag Pole', isComplex: true },
      { key: 'content-text', label: 'Content Text', isComplex: false },
      { key: 'lock-Type', label: 'Lock Type', isComplex: false },
      { key: 'frames-&-graphics', label: 'Frames & Graphics', isComplex: false },
      { key: 'additional-options', label: 'Additional Options', isComplex: false },
      { key: 'thickness', label: 'Thickness', isComplex: false },
      { key: 'cut', label: 'Cut', isComplex: true },
      { key: 'print-surface', label: 'Print Surface', isComplex: true },
      { key: 'shape', label: 'Shape', isComplex: true },
      { key: 'white-ink', label: 'White Ink', isComplex: true },
      { key: 'edge-finish', label: 'Edge Finish', isComplex: true },
      { key: 'grommets-2', label: 'Grommets', isComplex: true },
      { key: 'accessories', label: 'Accessories', isComplex: true },
    ];

    fields.forEach(({ key, label, isComplex, isPredefined }) => {
      if (!product[key] || product[key].length === 0) return; // Пропускаем пустые поля

      if (isPredefined) {
        // Для элемента "size" заполняем только его значения
        const sizeElement = document.querySelector('#size-select');
        const input = sizeElement.querySelector('.product__input');
        const span = sizeElement.querySelector('span');
        const optionsContainer = sizeElement.querySelector('.product__select-options');

        // Очищаем контейнер с опциями
        optionsContainer.innerHTML = '';

        // Устанавливаем значение по умолчанию
        const defaultValue = product[key][0];
        input.value = defaultValue;
        input.setAttribute('value', defaultValue); // Устанавливаем value для input
        span.textContent = defaultValue;

        // Добавляем опции
        product[key].forEach(value => {
          const optionHTML = `
          <li class="product__select-option">
            <article class="product__card" data-value="${value}">
              <h3 class="product__select-title">${value}</h3>
            </article>
          </li>
        `;
          optionsContainer.insertAdjacentHTML('beforeend', optionHTML);
        });

        return;
      }

      // Для остальных полей создаём элементы динамически
      const defaultValue = isComplex ? product[key][0].title : product[key][0];

      const fieldHTML = `
      <div class="product__select" id="${key}-select">
        <input type="text" class="product__input none" name="${key}" value="${defaultValue}">
        <div class="product__select-trigger link-anim">
          ${label}: <span>${defaultValue}</span>
          <svg class="product__svg-arrow">
            <use xlink:href="images/sprite.svg#arrow-icon"></use>
          </svg>
        </div>
        <ul class="product__select-options none">
          ${product[key]
          .map(item => {
            const value = isComplex ? item.title : item;
            const imgSrc = isComplex ? item.img : '#';
            return `
                <li class="product__select-option">
                  <article class="product__card" data-value="${value}">
                    <h3 class="product__select-title">${value}</h3>
                    <div class="product__img-box">
                      <img src="${imgSrc}" alt="" class="product__select-img" onerror="this.style.display='none';">
                    </div>
                  </article>
                </li>
              `;
          })
          .join('')}
        </ul>
      </div>
    `;

      fieldsContainer.insertAdjacentHTML('beforeend', fieldHTML);
    });
  }



  getProducts();
  swiperSlider()
};

export default productPageRender;