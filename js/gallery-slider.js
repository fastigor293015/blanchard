var i = 0;
    cur = 1;
    wrapper = document.querySelector('.gallery-slider__wrapper');
    slidesarr = document.querySelectorAll('.gallery-slider__slide');
    next = document.querySelector('.gallery-slider-pagination__btn_next');
    prev = document.querySelector('.gallery-slider-pagination__btn_prev');
    countfield = document.querySelector('.gallery-slider-pagination__count');
    count = 0;
    slidesW = 0; // Кол-во видимых картинок по горизонтали
    slidesH = 0; // Кол-во видимых картинок по вертикали
    x = 0;

function Count() {
  x = document.documentElement.clientWidth;
  if (x > 1320) {
    slidesW = 3;
    slidesH = 2;
  } else if (x > 460 && x <= 1320) {
    slidesW = 2;
    slidesH = 2;
  } else {
    slidesW = 1;
    slidesH = 1;
  }
  count = slidesarr.length / (slidesH * slidesW) + 0.49;
  count = count.toFixed();
  countfield.innerHTML = count;
  cur = 1;
  Current();
  i = 0;
  next.disabled = false;
  slidesarr.forEach(function(element) {
    element.style.transform = 'translate(' + i + 'px)';
  })
}

function Current() { //Устанавливает в поле номер текущего слайда + в зависимости от номера слайда добавляет к кнопкам атрибут disabled
  document.querySelector('.gallery-slider-pagination__current').innerHTML = cur;
  if (cur == count) {
    next.disabled = true;
  } else if (cur == 1) {
    prev.disabled = true;
  } else {
    next.disabled = false;
    prev.disabled = false;
  }
}

function Next() {
  let slideWidth = slidesarr[0].offsetWidth;

  if (cur <= count) {
    cur++;
    i = - (cur - 1) * slideWidth * slidesW;
    slidesarr.forEach(function(element) {
      element.style.transition = 'transform .3s';
      element.style.transform = 'translate(' + i + 'px)';
    })
    check();
    Current();
  }
}

function Prev() {
  let slideWidth = slidesarr[0].offsetWidth;

  if (cur >= 1) {
    cur--;
    i = - (cur - 1) * slideWidth * slidesW;
    slidesarr.forEach(function(element) {
      element.style.transition = 'transform .3s';
      element.style.transform = 'translate(' + i + 'px)';
    })
    check();
    Current();
  }
}

Count();
window.addEventListener('resize', function() {
  Count();
  screenWidth();
});
Current();

next.addEventListener('click', Next);
prev.addEventListener('click', Prev);

// Для мобильных устройств (свайп)
var  slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posFinal = 0,
    trfRegExp = /[-0-9.]+(?=px)/,
  slide = function() {
    let slideWidth = slidesarr[0].offsetWidth;

    slidesarr.forEach(function(item) {
      item.style.transition = 'transform .5s';
      item.style.transform = `translateX(-${(cur - 1) * slideWidth * slidesW}px)`;
    })
  }

  check = function() {
    if (cur < 1) {
      cur = 1;
    } else if (cur > count) {
      cur = count;
    }
  }

  getEvent = function() {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
    // p.s. event - аргумент по умолчанию в функции
  },
  // или es6
  getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event,

  swipeStart = function() {
    let evt = getEvent();

    // берем начальную позицию курсора по оси Х
    posInit = posX1 = evt.clientX;

    // убираем плавный переход, чтобы track двигался за курсором без задержки
    // т.к. он будет включается в функции slide()
    slidesarr.forEach(function(item) {
      item.style.transition = '';
    })

    // и сразу начинаем отслеживать другие события на документе
    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('mouseup', swipeEnd);
  },

  swipeAction = function() {
    let evt = getEvent(),
      // для более красивой записи возьмем в переменную текущее свойство transform
      style = document.querySelector('.gallery-slider__slide').style.transform,
      // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
      transform = +style.match(trfRegExp)[0];

    posX2 = (posX1 - evt.clientX) * slidesW;
    posX1 = evt.clientX;

    slidesarr.forEach(function(item) {
      item.style.transform = `translateX(${transform - posX2}px)`;
    })
    // можно было бы использовать метод строк .replace():
    // sliderTrack.style.transform = style.replace(trfRegExp, match => match - posX2);
    // но в дальнейшем нам нужна будет текущая трансформация в переменной
  }

  swipeEnd = function() {
    let slideWidth = slidesarr[0].offsetWidth,
        posThreshold = slideWidth * .35,

    // финальная позиция курсора
    posFinal = posInit - posX1;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    // убираем знак минус и сравниваем с порогом сдвига слайда
    if (Math.abs(posFinal) > posThreshold) {
      // если мы тянули вправо, то уменьшаем номер текущего слайда
      if (posInit < posX1) {
        Prev();
      // если мы тянули влево, то увеличиваем номер текущего слайда
      } else if (posInit > posX1) {
        Next();
      }
    }

    // если курсор двигался, то запускаем функцию переключения слайдов
    if (posInit !== posX1) {
      slide();
    }

  };

  slidesarr.forEach(function(item) {
    item.style.transform = 'translateX(0px)';
  })

  screenWidth = function() { // Проверка типа устройства у пользователя
    x = document.documentElement.clientWidth;
    if (x <= 1024) {
      wrapper.addEventListener('touchstart', swipeStart);
      wrapper.addEventListener('mousedown', swipeStart);
    } else {
      wrapper.removeEventListener('touchstart', swipeStart);
      wrapper.removeEventListener('mousedown', swipeStart);
    }
  }

  screenWidth();
