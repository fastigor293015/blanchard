document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.header-search__btn_search').addEventListener('click', function(active) {
    document.querySelector('.header__search').classList.add('header__search_active');
  })
  document.querySelector('.header-search__btn_close').addEventListener('click', function(active) {
    document.querySelector('.header__search').classList.remove('header__search_active');
  })
})
