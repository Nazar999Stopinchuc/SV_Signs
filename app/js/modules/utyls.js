export function setLocalStorage(key, data) {
  const jsonString = JSON.stringify(data);
  localStorage.setItem(key, jsonString);
};

export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  const dataObjekt = JSON.parse(data);

  return dataObjekt ? dataObjekt : [];
};

export function getParametrURL(parametr) {
  const urlParametr = new URLSearchParams(window.location.search);
  return urlParametr.get(parametr);
};

export function setBasketLocalStorageQuont() {
const basketCounts = document.querySelectorAll('.header-top__cart-quantity'); 
  if (!basketCounts.length) return;

  const cartData = getLocalStorage('products') || [];
  const count = cartData.length;

  basketCounts.forEach(basketCount => {
    basketCount.textContent = count; 
  });
}

export function filterEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== null && value !== undefined && value !== '')
  );
}

export function nextStep(step) {

  document.querySelectorAll('.cart__step').forEach((stepElement) => {
    stepElement.classList.remove('active');
  });

  document.getElementById(`step-${step}`).classList.add('active');

  window.scrollTo({
    top: 0,
    behavior: 'smooth', 
  });
}
