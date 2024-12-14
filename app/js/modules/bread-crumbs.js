function breadCrumbs() {
  const breadCrumbsList = document.querySelector('.bread-crumbs__list');
  let productsData = [];
  let brokerageData = [];
  if (!breadCrumbsList) return;


  function getParametrURL(parametr) {
    const urlParametr = new URLSearchParams(window.location.search);
    return urlParametr.get(parametr);
  };

  async function getProducts() {
    try {

      if (!productsData.length) {
        const product = await fetch('./data/products.json');

        if (!product.ok) {
          throw new Error(product.statusText);
        }

        productsData = await product.json();
      };

      if (!brokerageData.length) {
        const brokerage = await fetch('./data/brokerages.json');

        if (!brokerage.ok) {
          throw new Error(brokerage.statusText);
        }

        brokerageData = await brokerage.json();
      };

      renderbreadCrumbs(productsData, brokerageData);

    } catch (error) {
      console.log(error)
    }
  };

  function renderbreadCrumbs(products, brokerages) {
    const currentProduct = Number(getParametrURL('id'));
    const currentBrokerage = getParametrURL('brokerage');
    const breadcrumbItems = [
      { name: 'Home', link: 'index.html' },
    ];


    const findProduct = products.find(product => product.id === currentProduct);
    const findBrokerage = brokerages.find(brokerage => brokerage.parametr === currentBrokerage);

    if (findBrokerage) {
      breadcrumbItems.push({
        name: findBrokerage.title,
        link: `/brokerages.html?brokerage=${findBrokerage.parametr}`
      });
    } else {
      console.warn(`Broker with parameter"${currentBrokerage}" not found`);
    }
    if (findProduct) {
      const brokerageParam = findBrokerage ? findBrokerage.parametr : currentBrokerage;
      breadcrumbItems.push({
        name: findProduct.title,
        link: `/product.html?id=${findProduct.id}&brokerage=${brokerageParam || ''}`
      });
    } else {
      console.warn(`Product with id "${currentProduct}" not found`);
    }

    breadCrumbsList.innerHTML = '';
    breadcrumbItems.forEach(item => {
      const crumb = `
        <li class="bread-crumbs__item">
            <a class="bread-crumbs__link link-anim" href="${item.link}">${item.name}</a>
          </li>
      `;
      breadCrumbsList.insertAdjacentHTML('beforeend', crumb);
    });


  };

  getProducts();
};

export default breadCrumbs;