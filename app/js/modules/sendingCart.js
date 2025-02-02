import { getLocalStorage } from "./utyls";
import { nextStep } from "./utyls";


function sentCart() {
  const form = document.querySelector('#form-cart');
  const result = document.querySelector('#cart-out');

  // Укажите ваш токен бота и ID чата
  const BOT_TOKEN = '8186735774:AAEcNdUps9fUThrJs8vejy94cMztGQ59lFA';
  const CHAT_ID = '@SvSigns';
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const TELEGRAM_API_URL_DOCUMENT = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
  const TELEGRAM_API_URL_PHOTO = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
  const cartData = getLocalStorage('products');

  function formatObject(obj) {
    const details = Object.entries(obj.data)
      .map(([key, value]) => `<b>${key}:</b> ${value}`)
      .join('\n');
    return `<b>${obj.name}</b>\n${details}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const forms = document.querySelectorAll('.form__item-form');

    // Формируем текст сообщения для Telegram
    const title = `<b>New request from the site cart:</b>\n\n`;
    const deliveryInfo = `<b>Delivery method:</b> ${form.dataset.delivery}\n`;
    const formattedObjects = cartData.map(formatObject).join('\n\n');
    const formText = Array.from(formData.entries())
      .map(([key, value]) => `<b>${key}:</b> ${value}`)
      .join('\n') + '\n\n';

    const message = title + deliveryInfo + formText + formattedObjects;

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

      // Отправляем файлы
      for (const form of forms) {
        const fileFormData = new FormData(form);
        fileFormData.append('chat_id', CHAT_ID);

        const fileInputs = form.querySelectorAll('input[type="file"]');

        for (const fileInput of fileInputs) {
          if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileType = file.type;

            // Проверка допустимых форматов
            const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowedFileTypes.includes(fileType)) {
              result.style.display = 'block';
              result.innerHTML = 'Only PDF, JPG, or PNG files are allowed.';
              result.style.color = '#FD364E';
              result.style.borderColor = '#FD364E';
              return;
            }

            // Добавляем файл в запрос
            if (fileType === 'application/pdf') {
              fileFormData.append('document', file);
            } else {
              fileFormData.append('photo', file);
            }

            // Добавляем комментарий к файлу, если есть
            const textArea = form.querySelector('textarea');
            if (textArea && textArea.value) {
              fileFormData.append('caption', `Comment: ${textArea.value}`);
            }

            const fileResponse = await fetch(
              fileType === 'application/pdf' ? TELEGRAM_API_URL_DOCUMENT : TELEGRAM_API_URL_PHOTO,
              {
                method: 'POST',
                body: fileFormData,
              }
            );

            if (!fileResponse.ok) {
              throw new Error(`Failed to send the ${fileType === 'application/pdf' ? 'document' : 'photo'}.`);
            }
          }
        }
      }

      result.innerHTML = 'Your message has been sent successfully!';
      result.style.color = '#009B00';
      result.style.borderColor = '#009B00';
    } catch (error) {
      console.error(error);
      result.innerHTML = 'Something went wrong!';
      result.style.color = '#FD364E';
      result.style.borderColor = '#FD364E';
    }
    nextStep('3');
  });
}



export default sentCart;