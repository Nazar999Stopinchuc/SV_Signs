const forms = () => {
  const form = document.querySelector('#contact-form');
  const out = document.querySelector('.form__out');
  const mail = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirm_email');
  const inputs = document.querySelectorAll('.form__input');

  form.addEventListener('submit', (e) => {

    if (mail.value !== confirmEmail.value) {
      out.textContent = 'The email does not match, check the entered data';
      out.style.color = 'red';
      e.preventDefault();
      return;
    }

    // inputs.forEach(i  => {
    //   i.value = '';
    // });

    out.textContent = 'The application has been successfully sent. We will contact you. Thank you!';
    out.style.color = 'green';
  });
};

export default forms;

// action = "https://api.web3forms.com/submit" method = "POST"



