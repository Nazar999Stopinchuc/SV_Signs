function renderBrokerages() {
  const banner = document.querySelector('.brokerages__banner-img');
  let productsData = [];

  if (!banner) return;

  function getParametrURL(parametr) {
    const urlParametr = new URLSearchParams(window.location.search);
    return urlParametr.get(parametr);
  }

  async function getProducts() {
    try {

      if (!productsData.length) {
        const res = await fetch('./data/brokerages.json');

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        productsData = await res.json();
      }

      renderBrokeragesPage(productsData);
 
    } catch (error) {
      console.log(error)
    }
  };

  function renderBrokeragesPage(data) {
    const brokerage = getParametrURL('brokerage');
    const brokerageObj = data.find(obj => obj.parametr === brokerage);

    if (!brokerageObj) {
      return;
    }

    banner.src = brokerageObj['img-banner'];
  };


  getProducts();
};

export default renderBrokerages();