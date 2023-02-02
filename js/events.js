var btn = document.querySelector('.events__btn');

function buttonShow() {
  event.currentTarget.classList.add('events__btn_hidden');
  document.querySelectorAll('.events__item').forEach(function(item) {
    item.classList.add('events__item_show');
  })
}

btn.addEventListener('click', buttonShow);
