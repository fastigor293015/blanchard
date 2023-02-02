document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.burger').addEventListener('click', function(active) {
    active.currentTarget.classList.toggle('burger-active');
    document.querySelector('.header-upper__nav').classList.toggle('header-upper__nav_active');
  })
})
