document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.catalog-accordeon-content__btn').forEach(function(btn) {
    btn.disabled = true;
  })

  document.querySelectorAll('.catalog-accordeon__dropdown').forEach(function(item) {
    item.addEventListener('click', function(active) {
      var path = active.currentTarget.dataset.path;

      var data = document.querySelector('.catalog-accordeon__dropdown_active');

      if (data == null) {
        active.currentTarget.classList.add('catalog-accordeon__dropdown_active');
      }
      else {
        var del = data.dataset.path;
        if (del.localeCompare(path) == 0) {
          data.classList.remove('catalog-accordeon__dropdown_active');
        }
        else {
          data.classList.remove('catalog-accordeon__dropdown_active');
          active.currentTarget.classList.add('catalog-accordeon__dropdown_active');
        }
      }

      document.querySelectorAll('.catalog-accordeon__wrapper').forEach(function(content) {
        var target = content.dataset.target;
        if (target.localeCompare(path) == 0) {
          content.classList.toggle('catalog-accordeon__wrapper_active');
        } else {
          content.classList.remove('catalog-accordeon__wrapper_active');
        }
      })

      document.querySelectorAll('.catalog-accordeon-content__btn').forEach(function(btn) {
        if (btn.closest('.catalog-accordeon__wrapper').dataset.target.localeCompare(path) == 0) {
          if (btn.disabled == true) {
            btn.disabled = false;
          } else {
            btn.disabled = true;
          }
        } else {
          btn.disabled = true;
        }
      })
    })

    item.addEventListener('keyup', function(active) {
      if (event.keyCode === 13) {
        var path = active.currentTarget.dataset.path;

        var data = document.querySelector('.catalog-accordeon__dropdown_active');

        if (data == null) {
          active.currentTarget.classList.add('catalog-accordeon__dropdown_active');
        }
        else {
          var del = data.dataset.path;
          if (del.localeCompare(path) == 0) {
            data.classList.remove('catalog-accordeon__dropdown_active');
          }
          else {
            data.classList.remove('catalog-accordeon__dropdown_active');
            active.currentTarget.classList.add('catalog-accordeon__dropdown_active');
          }
        }

        document.querySelectorAll('.catalog-accordeon__wrapper').forEach(function(content) {
          var target = content.dataset.target;
          if (target.localeCompare(path) == 0) {
            content.classList.toggle('catalog-accordeon__wrapper_active');
          } else {
            content.classList.remove('catalog-accordeon__wrapper_active');
          }
        })

        document.querySelectorAll('.catalog-accordeon-content__btn').forEach(function(btn) {
          if (btn.closest('.catalog-accordeon__wrapper').dataset.target.localeCompare(path) == 0) {
            if (btn.disabled == true) {
              btn.disabled = false;
            } else {
              btn.disabled = true;
            }
          } else {
            btn.disabled = true;
          }
        })
      }
    })
  })

  document.querySelectorAll('.catalog-accordeon-content__btn').forEach(function(item) {
    item.addEventListener('click', function(active) {
      var path = active.currentTarget.dataset.path;
          x = document.documentElement.clientWidth;
      document.querySelector('.catalog-accordeon-content__btn_active').classList.remove('catalog-accordeon-content__btn_active');
      active.currentTarget.classList.add('catalog-accordeon-content__btn_active');
      document.querySelectorAll('.catalog__author').forEach(function(author) {
        var target = author.dataset.target;
            display = author.style.display;
        if (author.closest('.catalog__content').dataset.target == 'italy') {
          if (target.localeCompare(path) == 0) {
            author.style.display = 'block';
            setTimeout(() => {
              author.style.opacity = 1;
              author.style.transform = 'none';
            }, 10);
            if (x < 1024) {
              author.scrollIntoView();
            }
          } else {
            author.style.opacity = 0;
            author.style.display = 'none';
            author.style.transform = 'translateY(50px)';
          }
        }
      })
    })
  })
})
