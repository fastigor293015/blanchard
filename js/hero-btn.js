document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.hero__btn').addEventListener('click', function(active) {
    document.querySelector('.contacts__form').scrollIntoView();
  })
})
