const forms = () => {
  const form = document.querySelector('#contact-form');
  const result = document.querySelector('.form__out');
  const mail = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirm_email');

  form.addEventListener('submit', (e) => {

    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.style.display = "block";
    result.innerHTML = "Please wait...";
    result.style.color = '#009B00';
    result.style.borderColor = '#009B00';

    if (mail.value !== confirmEmail.value) {
      result.style.display = "block";
      result.innerHTML = 'The email does not match, check the entered data';
      result.style.color = '#FD364E';
      result.style.borderColor = '#FD364E';
      return;
    }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.style.display = "block";
          result.innerHTML = json.message;
          result.style.color = '#009B00';
          result.style.borderColor = '#009B00';
        } else {
          console.log(response);
          result.innerHTML = json.message;
        }
      })
      .catch(error => {
        console.log(error);
        result.style.display = "block";
        result.innerHTML = "Something went wrong!";
        result.style.color = '#FD364E';
        result.style.borderColor = '#FD364E';
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });

  });
};

export default forms;




