const forms = () => {
  const form = document.querySelector('#contact-form');
  const result = document.querySelector('.form__out');
  const mail = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirm_email');

  // Укажите ваш токен бота и ID чата
  const BOT_TOKEN = '8186735774:AAEcNdUps9fUThrJs8vejy94cMztGQ59lFA';
  const CHAT_ID = '@SvSigns';
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const TELEGRAM_API_URL_PHOTO = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const fileInput = document.querySelector('#file-input'); // Ищем поле для загрузки файла

    if (mail.value !== confirmEmail.value) {
      result.style.display = 'block';
      result.innerHTML = 'The email does not match, check the entered data';
      result.style.color = '#FD364E';
      result.style.borderColor = '#FD364E';
      return;
    }

    // Формируем текст сообщения для Telegram
    const title = `<b>New request from the site:</b>\n\n`;
    const message = title + Array.from(formData.entries())
      .filter(([key]) => key !== 'file') // Исключаем файл из текста
      .map(([key, value]) => `<b>${key}:</b> ${value}`)
      .join('\n');

    // Показать сообщение о процессе отправки
    result.style.display = 'block';
    result.innerHTML = 'Please wait...';
    result.style.color = '#009B00';
    result.style.borderColor = '#009B00';

    try {
      // Сначала отправляем текст
      const response = await fetch(TELEGRAM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send the message.');
      }

      // Если есть файл, отправляем его
      if (fileInput.files.length > 0) {
        const fileFormData = new FormData();
        fileFormData.append('chat_id', CHAT_ID);
        fileFormData.append('photo', fileInput.files[0]); // Отправляем первый файл как фото

        const fileResponse = await fetch(TELEGRAM_API_URL_PHOTO, {
          method: 'POST',
          body: fileFormData,
        });

        if (!fileResponse.ok) {
          throw new Error('Failed to send the photo.');
        }
      }

      result.innerHTML = 'Your message has been sent successfully!';
      result.style.color = '#009B00';
      result.style.borderColor = '#009B00';
    }
     catch (error) {
      console.error(error);
      result.innerHTML = 'Something went wrong!';
      result.style.color = '#FD364E';
      result.style.borderColor = '#FD364E';
    } finally {
      form.reset();
      setTimeout(() => {
        result.style.display = 'none';
      }, 5000);
    }
  });
};

export default forms;




