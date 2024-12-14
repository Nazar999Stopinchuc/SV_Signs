function search() {
  const input = document.querySelector('.search__input');
  const produktsList = document.querySelector('.search__list');
  let productsData = [];

  function insertMark(str, pos, len) {
    return str.slice(0, pos) + '<span>' + str.slice(pos, pos + len) + '</span>' + str.slice(pos + len);
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

      return productsData;

    } catch (error) {
      console.log(error)
    }
  };

  function loadProducts(products) {
    let val = input.value.trim();
    
    if (val !== '') {
      const foundProducts = products.filter(produkt => produkt.title.toLowerCase().includes(val.toLowerCase()))
      renderProducts(foundProducts);
    } else {
      produktsList.innerHTML = '';
    }
  };

  function renderProducts(foundProducts) {
    produktsList.innerHTML = '';

    foundProducts.forEach(produkt => {
      let produktName = produkt.title;
      const pos = produktName.toLowerCase().indexOf(input.value.toLowerCase());

      if (pos !== -1) {
        const highlightedName = insertMark(produktName, pos, input.value.length);

        const productItem = `
           <li class="serch__item">
              <a class="search__link link-anim" href="product.html?id=${produkt.id}">${highlightedName}</a>
            </li>
        `;
        produktsList.insertAdjacentHTML('beforeend', productItem);
      } else {
        const productItem = `
           <li class="serch__item">
              <a class="search__link link-anim" href="product.html?id=${produkt.id}">${product.title}</a>
            </li>
        `;
        produktsList.insertAdjacentHTML('beforeend', productItem);
      }
    })
  };


  
  
  input.addEventListener('input', () => loadProducts(productsData));
  getProducts();
};

export default search;