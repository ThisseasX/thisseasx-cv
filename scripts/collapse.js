document.querySelectorAll('.info-section__title').forEach((section) => {
  const container = section.nextElementSibling;

  const height = container.getBoundingClientRect().height;
  container.style.height = `${height}px`;

  let isOpen = true;

  section.addEventListener('click', () => {
    container.style.height = isOpen ? '0px' : `${height}px`;
    container.classList.toggle('info-container--collapsed');

    isOpen = !isOpen;
  });
});
