//  function dropDown() {
//    document.querySelectorAll('.product__select').forEach(function (dropDownWrapper) {

//      const dropDownBtn = dropDownWrapper.querySelector('.product__select-trigger');
//      const itemsList = dropDownWrapper.querySelector('.product__select-options');
//      const dropDownInput = dropDownWrapper.querySelector('.product__input');

//     dropDownBtn.addEventListener('click', () => {
//       itemsList.classList.toggle('none');
//       dropDownBtn.classList.toggle('active');
//     });

//     itemsList.addEventListener('click', (e) => {
//       const target = e.target;

//       if (target && target.tagName === 'ARTICLE') {
//         dropDownInput.value = target.dataset.value;
//         dropDownBtn.querySelector('span').textContent = target.dataset.value;
//       };
//     });

//     document.addEventListener('click', (e) => {
//       if (e.target !== dropDownBtn) {
//         itemsList.classList.add('none');
//         dropDownBtn.classList.remove('active');
//       }
//     });
//   });
// };
function dropDown() {
  const container = document.querySelector('.product__form'); // Родительский элемент

  container.addEventListener('click', (e) => {
    const dropDownWrapper = e.target.closest('.product__select');

    if (!dropDownWrapper) return;

    const dropDownBtn = dropDownWrapper.querySelector('.product__select-trigger');
    const itemsList = dropDownWrapper.querySelector('.product__select-options');
    const dropDownInput = dropDownWrapper.querySelector('.product__input');

    if (e.target === dropDownBtn || dropDownBtn.contains(e.target)) {
      itemsList.classList.toggle('none');
      dropDownBtn.classList.toggle('active');
    }

    if (e.target.tagName === 'ARTICLE') {
      dropDownInput.value = e.target.dataset.value;
      dropDownBtn.querySelector('span').textContent = e.target.dataset.value;

      itemsList.classList.add('none');
      dropDownBtn.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.product__select')) {
      document.querySelectorAll('.product__select-options').forEach((list) => {
        list.classList.add('none');
      });
      document.querySelectorAll('.product__select-trigger').forEach((btn) => {
        btn.classList.remove('active');
      });
    }
  });
}

export default dropDown;