const skills = [
  '70%',
  '50%',
  '100%',
  '100%',
  '100%',
  '100%',
  '100%',
  '100%',
  '70%',
  '100%',
];

document.querySelectorAll('.skill-bar__inner').forEach((skillBar, index) => {
  setTimeout(() => {
    skillBar.style.width = skills[index];
  }, index * 30);
});

let isOpen = true;

document
  .querySelector('#skills-section-title')
  .addEventListener('click', () => {
    document
      .querySelectorAll('.skill-bar__inner')
      .forEach((skillBar, index) => {
        if (isOpen) {
          setTimeout(() => {
            skillBar.style.width = 0;
          }, index * 30);
        } else {
          setTimeout(() => {
            skillBar.style.width = skills[index];
          }, index * 30);
        }
      });

    isOpen = !isOpen;
  });
