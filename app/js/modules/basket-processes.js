import { getLocalStorage } from "./utyls";
import { setLocalStorage } from "./utyls";
import { nextStep } from "./utyls";
import { setBasketLocalStorageQuont } from "./utyls";

function basketProcesses() {
  const nextStepBtn = document.querySelector('.cart__btn-next');
  const prevStepBtn = document.querySelectorAll('.cart__back-btn');
  const cartItems = document.querySelector('.cart__items');
  const cartSummaryItems = document.querySelector('.summary__list');
  if (!cartItems) return;
  let productsData = [];


  async function getProducts() {
    try {
      if (!productsData.length) {
        const res = await fetch('./data/products.json');

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        productsData = await res.json();
      }
      renderCartItems(productsData);
      renderSummatyItems(productsData);

    } catch (error) {
      console.log(error);
    }
  };

  function renderCartItems(products) {
    cartItems.innerHTML = '';
    const cartData = getLocalStorage('products');
    if (!cartData || !cartData.length) {
      cartItems.innerHTML = `<p class="cart__text">Your cart is empty.</p>`;
      nextStepBtn.style.display = 'none';
      return;
    }

    cartData.forEach(item => {
      const { size, quantity } = item.data;
      const { id, brokerage } = item;

      const product = products.find(item => item.id === Number(id));
      if (!product) return;
      const { img } = product;

      let showImg = Object.keys(img)[0];
      if (!(brokerage === null) && brokerage in img) {
        showImg = brokerage;
      }

      const detailsArr = Object.entries(item.data);
      const detailHTML = detailsArr.map(detail => {
        return `
          <li class="cart__details-item">
             <p class="cart__details-info">${detail[0]}: <span>${detail[1]}</span></p>
          </li>
        `;
      }).join('');



      const cartItem = `
      <li class="cart__item" data-product-id="${id}">
            <div class="cart__item-wrap">
              <div class="cart__img-wrap">
                <img class="cart__item-img" src="${img[showImg]}" alt="product image">
              </div>

              <article class="cart__details">
                <h2 class="cart__subtitle">${product.title}</h2>
                <p class="cart__info">Size: <span>${size}</span></p>
                <p class="cart__info">Quantity: <span>${quantity}</span></p>
                <div class="cart__show-details">
                  <button class="cart__info cart__info--details" id="ditails-btn">Show details:
                    <svg class="cart__svg-arrow">
                      <use xlink:href="images/sprite.svg#arrow-icon"></use>
                    </svg>
                  </button>
                  <ul class="cart__details-list">
                  ${detailHTML}
                  </ul>
                </div>
                <form class="form__item-form" id="form_produkt_${id}" data-name="${product.title}">
                  <p class="form__label">File Upload <span>(Optional)</span></p>
                  <label class="form__label form__label--file" for="file-input" data-drop-label>
                    <span class="form__custom-button">Upload File</span>
                    <span class="form__file-name" data-file-name>or Drag Files here</span>
                    <input class="form__input form__input--file" type="file" id="file-input-${id}" name="file"
                      accept="application/pdf, image/jpeg, image/png" data-drop-input>
                  </label>

                  <label class="form__label for="text">Other Details <span>(Optional)</span></label>
                  <textarea class="form__input form__input--text" id="text-${id}" name="text"></textarea>
                </form>
              </article>
            </div>

            <button class="cart__btn-remove">Remove Item</button>
          </li>
      `;
      cartItems.insertAdjacentHTML('beforeend', cartItem);
    });

  };

  function renderSummatyItems(products) {
    cartSummaryItems.innerHTML = "";
    const cartData = getLocalStorage('products');

    cartData.forEach(item => {
      const { size, quantity } = item.data;
      const { id, brokerage } = item;

      const product = products.find(item => item.id === Number(id));
      if (!product) return;
      const { img } = product;

      let showImg = Object.keys(img)[0];
      if (!(brokerage === null) && brokerage in img) {
        showImg = brokerage;
      }

      const cartItem = `
      <li class="summary__item">
        <div class="summary__img-wrap">
          <img src="${img[showImg]}" alt="product image" class="summary__img">
        </div>

        <div class="summary__info">
          <h2 class="summary__subtitle">${product.title}</h2>
          <p class="summary__detail">Size: <span>${size}</span></p>
          <p class="summary__detail">Quantity: <span>${quantity}</span></p>
        </div>
      </li>
      `;
      cartSummaryItems.insertAdjacentHTML('beforeend', cartItem);
    });

  }

  function delProductCart(e) {
    const targetBtn = e.target.closest('.cart__btn-remove');
    if (!targetBtn) return;

    const product = targetBtn.closest('.cart__item');
    const id = product.dataset.productId;
    const cartData = getLocalStorage('products');

    const newCart = cartData.filter(item => item.id !== id);

    setLocalStorage('products', newCart);

    renderCartItems(productsData);
    setBasketLocalStorageQuont();
  };

  function shippingMethod() {
    const pickupRadio = document.querySelector('#pickup-radio');
    const deliveryRadio = document.querySelector('#delivery-radio');
    const formInfo = document.querySelector('.form__street-address');
    const form = document.querySelector('#form-cart');

    deliveryRadio.addEventListener('change', () => {
      if (deliveryRadio.checked) {
        formInfo.classList.remove('hidden'); 
        form.dataset.delivery = 'delivery';
      }
    });

    pickupRadio.addEventListener('change', () => {
      if (pickupRadio.checked) {
        formInfo.classList.add('hidden'); 
        form.dataset.delivery = 'pickup';
      }
    });
  }

  getProducts();
  shippingMethod();

  cartItems.addEventListener('click', (e) => {
    delProductCart(e);
  });

  nextStepBtn.addEventListener('click', () => nextStep('2'));

  prevStepBtn.forEach(btn => {
    btn.addEventListener('click', () => nextStep('1'));
  })
};

export default basketProcesses;