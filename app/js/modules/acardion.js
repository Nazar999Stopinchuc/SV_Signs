function accordionMob() {
  const container = document.querySelector('.menu-mob');

  container.addEventListener('click', (e) => {
    const target = e.target;

    if (!target) return;

    // Проверяем, был ли кликнут элемент с классом 'acardion-triger'
    const trigger = target.closest('.acardion-triger');

    if (!trigger) return;

    // Находим связанное содержимое аккордеона (подменю)
    const targetContent = trigger.querySelector('.acardion-content');

    // Закрываем все аккордеоны на том же уровне, что и текущий
    const siblings = trigger.parentElement.querySelectorAll('.acardion-content');
    siblings.forEach(content => {
      if (content !== targetContent) {
        content.classList.remove('active');
      }
    });

    // Переключаем 'active' на текущем элементе
    targetContent.classList.toggle('active');
  });
}







export default accordionMob;