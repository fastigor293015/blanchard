var dropdown = document.querySelectorAll('.header-dropdown__list');
for (i = 0; i < dropdown.length; i++) {
  const simpleBar = new SimpleBar(dropdown[i], {
    scrollbarMinSize: 20,
    scrollbarMaxSize: 28,
  });
}
