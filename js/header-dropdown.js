document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.header-lower__btn').forEach(function(el) {
    el.addEventListener('click', function(active) {
      var path = active.currentTarget.dataset.path;

      var data = document.querySelector('.header-lower__btn_active');

      if (data == null) {
        active.currentTarget.classList.add('header-lower__btn_active');
      }
      else {
        var del = data.dataset.path;
        if (del.localeCompare(path) == 0) {
          data.classList.remove('header-lower__btn_active');
        }
        else {
          data.classList.remove('header-lower__btn_active');
          active.currentTarget.classList.add('header-lower__btn_active');
        }
      }

      document.querySelectorAll('.header__dropdown').forEach(function(drop) {
        var target = drop.dataset.target;
        if (target.localeCompare(path) == 0) {
          drop.classList.toggle('header__dropdown_active');
        }
        else {
          drop.classList.remove('header__dropdown_active');
        }
      })
    })
  })
})
