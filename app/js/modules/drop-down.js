 function dropDown() {
   document.querySelectorAll('.product__select').forEach(function (dropDownWrapper) {

     const dropDownBtn = dropDownWrapper.querySelector('.product__select-trigger');
     const itemsList = dropDownWrapper.querySelector('.product__select-options');
     const dropDownInput = dropDownWrapper.querySelector('.product__input');

    dropDownBtn.addEventListener('click', () => {
      itemsList.classList.toggle('none');
      dropDownBtn.classList.toggle('active');
    });

    itemsList.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.tagName === 'ARTICLE') {
        dropDownInput.value = target.dataset.value;
        dropDownBtn.querySelector('span').textContent = target.dataset.value;
      };
    });

    document.addEventListener('click', (e) => {
      if (e.target !== dropDownBtn) {
        itemsList.classList.add('none');
        dropDownBtn.classList.remove('active');
      }
    });
  });
};

export default dropDown;