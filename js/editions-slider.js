var ei = 0;
    ecur = 1;
    ewrapper = document.querySelector('.editions-slider__wrapper');
    eslidesarr = document.querySelectorAll('.editions-slider__slide');
    enext = document.querySelector('.editions-slider-pagination__btn_next');
    eprev = document.querySelector('.editions-slider-pagination__btn_prev');
    ecountfield = document.querySelector('.editions-slider-pagination__count');
    ecount = 0;
    eslidesW = 0; // Кол-во видимых картинок по горизонтали
    ex = 0;

function eCount() {
  ex = document.documentElement.clientWidth;
  if (ex > 1320) {
    eslidesW = 3;
  } else if (ex > 660 && ex <= 1320) {
    eslidesW = 2;
  } else {
    eslidesW = 1;
  }
  ecount = eslidesarr.length / eslidesW + 0.49;
  ecount = ecount.toFixed();
  ecountfield.innerHTML = ecount;
  ecur = 1;
  eCurrent();
  ei = 0;
  enext.disabled = false;
  eslidesarr.forEach(function(element) {
    element.style.transform = 'translate(' + ei + 'px)';
  })
}

function eCurrent() { //Устанавливает в поле номер текущего слайда + в зависимости от номера слайда добавляет к кнопкам атрибут disabled
  document.querySelector('.editions-slider-pagination__current').innerHTML = ecur;
  if (ecur == ecount) {
    enext.disabled = true;
  } else if (ecur == 1) {
    eprev.disabled = true;
  } else {
    enext.disabled = false;
    eprev.disabled = false;
  }
}

function eNext() {
  let eslideWidth = eslidesarr[0].offsetWidth;

  if (ecur <= ecount) {
    ecur++;
    ei = - (ecur - 1) * eslideWidth * eslidesW;
    eslidesarr.forEach(function(element) {
      element.style.transition = 'transform .3s';
      element.style.transform = 'translate(' + ei + 'px)';
    })
    echeck();
    eCurrent();
  }
}

function ePrev() {
  let eslideWidth = eslidesarr[0].offsetWidth;

  if (ecur >= 1) {
    ecur--;
    ei = - (ecur - 1) * eslideWidth * eslidesW;
    eslidesarr.forEach(function(element) {
      element.style.transition = 'transform .3s';
      element.style.transform = 'translate(' + ei + 'px)';
    })
    echeck();
    eCurrent();
  }
}

eCount();
window.addEventListener('resize', function() {
  eCount();
  escreenWidth();
});
eCurrent();

enext.addEventListener('click', eNext);
eprev.addEventListener('click', ePrev);

// Для мобильных устройств (свайп)
var  eslideIndex = 0,
    eposInit = 0,
    eposX1 = 0,
    eposX2 = 0,
    eposFinal = 0,
    etrfRegExp = /[-0-9.]+(?=px)/,
  eslide = function() {
    let eslideWidth = eslidesarr[0].offsetWidth;

    eslidesarr.forEach(function(item) {
      item.style.transition = 'transform .5s';
      item.style.transform = `translateX(-${(ecur - 1) * eslideWidth * eslidesW}px)`;
    })
  }

  echeck = function() {
    if (ecur < 1) {
      ecur = 1;
    } else if (ecur > ecount) {
      ecur = ecount;
    }
  }

  egetEvent = function() {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
    // p.s. eevent - аргумент по умолчанию в функции
  },
  // или es6
  egetEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event,

  eswipeStart = function() {
    let eevt = egetEvent();

    // берем начальную позицию курсора по оси Х
    eposInit = eposX1 = eevt.clientX;

    // убираем плавный переход, чтобы track двигался за курсором без задержки
    // т.к. он будет включается в функции slide()
    eslidesarr.forEach(function(item) {
      item.style.transition = '';
    })

    // и сразу начинаем отслеживать другие события на документе
    document.addEventListener('touchmove', eswipeAction);
    document.addEventListener('touchend', eswipeEnd);
    document.addEventListener('mousemove', eswipeAction);
    document.addEventListener('mouseup', eswipeEnd);
  },

  eswipeAction = function() {
    let eevt = egetEvent(),
      // для более красивой записи возьмем в переменную текущее свойство transform
      estyle = document.querySelector('.editions-slider__slide').style.transform,
      // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
      etransform = +estyle.match(etrfRegExp)[0];

    eposX2 = (eposX1 - eevt.clientX) * eslidesW;
    eposX1 = eevt.clientX;

    eslidesarr.forEach(function(item) {
      item.style.transform = `translateX(${etransform - eposX2}px)`;
    })
    // можно было бы использовать метод строк .replace():
    // sliderTrack.style.transform = style.replace(trfRegExp, match => match - posX2);
    // но в дальнейшем нам нужна будет текущая трансформация в переменной
  }

  eswipeEnd = function() {
    let eslideWidth = eslidesarr[0].offsetWidth,
        eposThreshold = eslideWidth * .35,

    // финальная позиция курсора
    eposFinal = eposInit - eposX1;

    document.removeEventListener('touchmove', eswipeAction);
    document.removeEventListener('mousemove', eswipeAction);
    document.removeEventListener('touchend', eswipeEnd);
    document.removeEventListener('mouseup', eswipeEnd);

    // убираем знак минус и сравниваем с порогом сдвига слайда
    if (Math.abs(eposFinal) > eposThreshold) {
      // если мы тянули вправо, то уменьшаем номер текущего слайда
      if (eposInit < eposX1) {
        ePrev();
      // если мы тянули влево, то увеличиваем номер текущего слайда
      } else if (eposInit > eposX1) {
        eNext();
      }
    }

    // если курсор двигался, то запускаем функцию переключения слайдов
    if (eposInit !== eposX1) {
      eslide();
    }

  };

  eslidesarr.forEach(function(item) {
    item.style.transform = 'translateX(0px)';
  })

  escreenWidth = function() { // Проверка типа устройства у пользователя
    ex = document.documentElement.clientWidth;
    if (ex > 460 && ex <= 1024) {
      ewrapper.addEventListener('touchstart', eswipeStart);
      ewrapper.addEventListener('mousedown', eswipeStart);
    } else {
      ewrapper.removeEventListener('touchstart', eswipeStart);
      ewrapper.removeEventListener('mousedown', eswipeStart);
    }
  }

  escreenWidth();
