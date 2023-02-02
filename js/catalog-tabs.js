document.addEventListener('DOMContentLoaded',  function() {
  document.querySelectorAll('.catalog-tabs__btn').forEach(function(item) {
    item.addEventListener('click', function(active) {
      var path = active.currentTarget.dataset.path;
      document.querySelectorAll('.catalog-tabs__btn').forEach(function(item) {
        if (item.classList.contains('catalog-tabs__btn_active') == true) {
          item.classList.remove('catalog-tabs__btn_active');
        }
      })
      active.currentTarget.classList.add('catalog-tabs__btn_active');
      document.querySelectorAll('.catalog__content').forEach(function(content) {
        var target = content.dataset.target;
            display = content.style.display;
        if (target.localeCompare(path) == 0) {
          content.style.display = 'flex';
          setTimeout(() => {
            content.style.opacity = 1;
            content.style.transform = 'none';
          }, 10);
        } else {
          content.style.opacity = 0;
          content.style.display = 'none';
          content.style.transform = 'translateY(50px)';
        }
      })
    })
  })
})
