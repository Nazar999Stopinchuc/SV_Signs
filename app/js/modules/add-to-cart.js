import { getParametrURL } from "./utyls";
import { getLocalStorage } from "./utyls";
import { setLocalStorage } from "./utyls";
import { setBasketLocalStorageQuont } from "./utyls";
import { filterEmptyValues } from "./utyls";


function addToCart() {
  const produktForm = document.querySelector('.product__form');
  const produktOut = document.querySelector('.product__output');
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
     
      return productsData;

    } catch (error) {
      console.log(error);
    }
  };

  async function initializeProducts() {
    try {
      productsData = await getProducts();
    } catch (error) {
      console.error('Error loading products on page load:', error);
    }
  }


  function addToCart() {
    const produktId = getParametrURL('id');
    const produktBrokerage = getParametrURL('brokerage');
    const product = productsData.find(item => item.id === Number(produktId));

    const formData = new FormData(produktForm);
    const objectData = Object.fromEntries(formData);
    const objectWithoutEmptyValues = filterEmptyValues(objectData);

    const cartData = getLocalStorage('products');
    const newCartData = cartData.filter(item => item.id !== produktId);

    newCartData.push({
      id: produktId,
      brokerage: produktBrokerage,
      data: objectWithoutEmptyValues,
      name: product.title,
    });


    produktOut.textContent = 'Product added successfully!';
    setTimeout(() => {
      produktOut.textContent = '';
    }, 5000);

    setLocalStorage('products', newCartData);
    setBasketLocalStorageQuont();
  };

  initializeProducts();

  produktForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addToCart();
  });

};

export default addToCart;