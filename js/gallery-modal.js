document.addEventListener('DOMContentLoaded', function() {
  var modal = document.querySelector('.gallery__modal');
      dark = document.querySelector('.gallery__dark');
      button = document.querySelector('.gallery-modal__btn');
  document.querySelectorAll('.gallery-slider-slide__content').forEach(function(item) {
    item.addEventListener('click', function(active) {
      dark.classList.add('gallery__dark_show');
      modal.classList.add('gallery__modal_show');
      button.focus();
    })

    item.addEventListener('keyup', function(active) {
      if (event.keyCode === 13) {
        dark.classList.add('gallery__dark_show');
        modal.classList.add('gallery__modal_show');
        button.focus();
      }
    })
  })
  button.addEventListener('click', function(btn) {
    dark.classList.remove('gallery__dark_show');
    modal.classList.remove('gallery__modal_show');
  })
})
