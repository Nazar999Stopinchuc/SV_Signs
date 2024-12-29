function signUp() {
  const form = document.querySelector('.sign-up__form');
  const result = document.querySelector('.sign-up__out');

  const BOT_TOKEN = '8186735774:AAEcNdUps9fUThrJs8vejy94cMztGQ59lFA';
  const CHAT_ID = '@SvSigns';
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Формируем текст сообщения для Telegram
    const title = `<b>New subscription:</b>\n\n`;
    const message = title + Array.from(formData.entries())
      .map(([key, value]) => `<b>${key}:</b> ${value}`)
      .join('\n');

    // Показать сообщение о процессе отправки
    result.style.display = 'block';
    result.innerHTML = 'Please wait...';
    result.style.color = '#FFFFFF';
    result.style.borderColor = '#FFFFFF';

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

      result.innerHTML = 'Your message has been sent successfully!';
      result.style.color = '#FFFFFF';
      result.style.borderColor = '#FFFFFF';
    }
    catch (error) {
      console.error(error);
      result.innerHTML = 'Something went wrong!';
      result.style.color = '#FFFFFF';
      result.style.borderColor = '#FFFFFF';
    } finally {
      form.reset();
      setTimeout(() => {
        result.style.display = 'none';
      }, 5000);
    }
  });
};

export default signUp;