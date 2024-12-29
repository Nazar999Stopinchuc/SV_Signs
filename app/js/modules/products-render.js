function productsRender() {
  const COUNT_SHOW_CARDS_CLICK = 8;

  const cards = document.querySelector('.produkts__list')
  const showCardsBtn = document.querySelector('.produkts__more');
  const showCardsBtnWrap = document.querySelector('.produkts__wrap-btn');

  let showCards = COUNT_SHOW_CARDS_CLICK;
  let countClickBtn = 1;
  let productsData = [];

  function getParametrURL(parametr) {
    const urlParametr = new URLSearchParams(window.location.search);
    return urlParametr.get(parametr);
  }

  async function getProducts() {
    try {

      if (!productsData.length) {
        const res = await fetch('./data/products.json');

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        productsData = await res.json();
      }

      if ((productsData.length > COUNT_SHOW_CARDS_CLICK) &&
        showCardsBtnWrap.classList.contains('none')) {
        showCardsBtnWrap.classList.remove('none');
      }

      renderProductsPage(productsData);

    } catch (error) {
      console.log(error)
    }
  };

  function renderProductsPage(data) {
    if (!data || !data.length) {
      console.log('data is empty');
      return;
    }

    const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
    createCards(arrCards);

  };

  function createCards(data) {
    const currentBrokerage = getParametrURL('brokerage');

    data.forEach(card => {
      const { id, img, descr_short, title, reviews } = card;

      let showImg = Object.keys(img)[0];

      if (!(currentBrokerage === null) && currentBrokerage in img) {
        showImg = currentBrokerage;
      }

      const cardItem = `
      <li class="produkts__item">
            <article class="produkt-card" id="${id}">
              <a class="produkt-card__link" href="product.html?id=${id}&brokerage=${currentBrokerage}"></a>
              <div class="produkt-card__img-wrap">
                <img class="produkt-card__img" src="${img[showImg]}" alt="product photo ${title}">
              </div>
              <h3 class="produkt-card__title">${title}</h3>
              <div class="produkt-card__reviews">
                <ul class="produkt-card__stars">
                  <li class="produkt-card__stars-item">
                    <svg class="produkt-card__svg">
                      <use xlink:href="images/sprite.svg#star-icon"></use>
                    </svg>
                  </li>
                  <li class="produkt-card__stars-item">
                    <svg class="produkt-card__svg">
                      <use xlink:href="images/sprite.svg#star-icon"></use>
                    </svg>
                  </li>
                  <li class="produkt-card__stars-item">
                    <svg class="produkt-card__svg">
                      <use xlink:href="images/sprite.svg#star-icon"></use>
                    </svg>
                  </li>
                  <li class="produkt-card__stars-item">
                    <svg class="produkt-card__svg">
                      <use xlink:href="images/sprite.svg#star-icon"></use>
                    </svg>
                  </li>
                  <li class="produkt-card__stars-item">
                    <svg class="produkt-card__svg">
                      <use xlink:href="images/sprite.svg#star-icon"></use>
                    </svg>
                  </li>
                </ul>
                <p class="produkt-card__reviews-quantity">
                  <span class="produkt-card__reviews-number">${reviews}</span>
                  Reviews
                </p>
              </div>
              <p class="produkt-card__deskr">
                ${descr_short}
              </p>
              <a class="produkt-card__link-shop" href="product.html?id=${id}">Shop</a>
            </article>
          </li>
      `;
      cards.insertAdjacentHTML('beforeend', cardItem);
    });
  };

  function sliceArrCards() {
    if (showCards >= productsData.length) return;

    countClickBtn++;
    const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtn;

    const arrCards = productsData.slice(showCards, countShowCards);
    createCards(arrCards);
    showCards = cards.children.length;

    if (showCards >= productsData.length) {
      showCardsBtnWrap.classList.add('none');
    }
  };


  showCardsBtn.addEventListener('click', sliceArrCards);

  getProducts();
};

export default productsRender;