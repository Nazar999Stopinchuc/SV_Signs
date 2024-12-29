const accordion = (triggersSelector, parentBox) => {
  const parent = document.querySelector(parentBox);

  parent.addEventListener('click', function (e) {
    if (e.target && e.target.matches(triggersSelector)) {
      const btn = e.target;
      btn.classList.toggle('active-style');
      btn.nextElementSibling.classList.toggle('active-content');
    }
  });

};

export default accordion;