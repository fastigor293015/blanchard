var pi = 0;
    pcur = 1;
    pwrapper = document.querySelector('.projects-slider__wrapper');
    pslidesarr = document.querySelectorAll('.projects-slider__slide');
    pnext = document.querySelector('.projects-slider__btn_next');
    pprev = document.querySelector('.projects-slider__btn_prev');
    pcount = 0;
    pslidesW = 0; // Кол-во видимых картинок по горизонтали
    px = 0;

function pCount() {
  px = document.documentElement.clientWidth;
  if (px > 1320) {
    pslidesW = 3;
  } else if (px > 460 && px <= 1320) {
    pslidesW = 2;
  } else {
    pslidesW = 1;
  }
  pcount = pslidesarr.length / pslidesW + 0.49;
  pcount = pcount.toFixed();
  pcur = 1;
  pCurrent();
  pi = 0;
  pnext.disabled = false;
  pslidesarr.forEach(function(element) {
    element.style.transform = 'translate(' + pi + 'px)';
  })
}

function pCurrent() { //Устанавливает в поле номер текущего слайда + в зависимости от номера слайда добавляет к кнопкам атрибут disabled
  if (pcur == pcount) {
    pnext.disabled = true;
  } else if (pcur == 1) {
    pprev.disabled = true;
  } else {
    pnext.disabled = false;
    pprev.disabled = false;
  }
}

function pNext() {
  let pslideWidth = pslidesarr[0].offsetWidth;

  if (pcur <= pcount) {
    pcur++;
    pi = - (pcur - 1) * pslideWidth * pslidesW;
    pslidesarr.forEach(function(element) {
      element.style.transition = 'transform .3s';
      element.style.transform = 'translate(' + pi + 'px)';
    })
    pcheck();
    pCurrent();
  }
}

function pPrev() {
  let pslideWidth = pslidesarr[0].offsetWidth;

  if (pcur >= 1) {
    pcur--;
    pi = - (pcur - 1) * pslideWidth * pslidesW;
    pslidesarr.forEach(function(element) {
      element.style.transition = 'transform .3s';
      element.style.transform = 'translate(' + pi + 'px)';
    })
    pcheck();
    pCurrent();
  }
}

pCount();
window.addEventListener('resize', function() {
  pCount();
  pscreenWidth();
});
pCurrent();

pnext.addEventListener('click', pNext);
pprev.addEventListener('click', pPrev);

// Для мобильных устройств (свайп)
var  pslideIndex = 0,
    pposInit = 0,
    pposX1 = 0,
    pposX2 = 0,
    pposFinal = 0,
    ptrfRegExp = /[-0-9.]+(?=px)/,
  pslide = function() {
    let pslideWidth = pslidesarr[0].offsetWidth;

    pslidesarr.forEach(function(item) {
      item.style.transition = 'transform .5s';
      item.style.transform = `translateX(-${(pcur - 1) * pslideWidth * pslidesW}px)`;
    })
  }

  pcheck = function() {
    if (pcur < 1) {
      pcur = 1;
    } else if (pcur > pcount) {
      pcur = pcount;
    }
  }

  pgetEvent = function() {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
    // p.s. event - аргумент по умолчанию в функции
  },
  // или es6
  pgetEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event,

  pswipeStart = function() {
    let pevt = pgetEvent();

    // берем начальную позицию курсора по оси Х
    pposInit = pposX1 = pevt.clientX;

    // убираем плавный переход, чтобы track двигался за курсором без задержки
    // т.к. он будет включается в функции slide()
    pslidesarr.forEach(function(item) {
      item.style.transition = '';
    })

    // и сразу начинаем отслеживать другие события на документе
    document.addEventListener('touchmove', pswipeAction);
    document.addEventListener('touchend', pswipeEnd);
    document.addEventListener('mousemove', pswipeAction);
    document.addEventListener('mouseup', pswipeEnd);
  },

  pswipeAction = function() {
    let pevt = pgetEvent(),
      // для более красивой записи возьмем в переменную текущее свойство transform
      pstyle = document.querySelector('.projects-slider__slide').style.transform,
      // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
      ptransform = +pstyle.match(ptrfRegExp)[0];

    pposX2 = (pposX1 - pevt.clientX) * pslidesW;
    pposX1 = pevt.clientX;

    pslidesarr.forEach(function(item) {
      item.style.transform = `translateX(${ptransform - pposX2}px)`;
    })
    // можно было бы использовать метод строк .replace():
    // sliderTrack.style.transform = style.replace(trfRegExp, match => match - posX2);
    // но в дальнейшем нам нужна будет текущая трансформация в переменной
  }

  pswipeEnd = function() {
    let pslideWidth = pslidesarr[0].offsetWidth,
        pposThreshold = pslideWidth * .35,

    // финальная позиция курсора
    pposFinal = pposInit - pposX1;

    document.removeEventListener('touchmove', pswipeAction);
    document.removeEventListener('mousemove', pswipeAction);
    document.removeEventListener('touchend', pswipeEnd);
    document.removeEventListener('mouseup', pswipeEnd);

    // убираем знак минус и сравниваем с порогом сдвига слайда
    if (Math.abs(pposFinal) > pposThreshold) {
      // если мы тянули вправо, то уменьшаем номер текущего слайда
      if (pposInit < pposX1) {
        pPrev();
      // если мы тянули влево, то увеличиваем номер текущего слайда
      } else if (pposInit > pposX1) {
        pNext();
      }
    }

    // если курсор двигался, то запускаем функцию переключения слайдов
    if (pposInit !== pposX1) {
      pslide();
    }

  };

  pslidesarr.forEach(function(item) {
    item.style.transform = 'translateX(0px)';
  })

  pscreenWidth = function() { // Проверка типа устройства у пользователя
    px = document.documentElement.clientWidth;
    if (px <= 1024) {
      pwrapper.addEventListener('touchstart', pswipeStart);
      pwrapper.addEventListener('mousedown', pswipeStart);
    } else {
      pwrapper.removeEventListener('touchstart', pswipeStart);
      pwrapper.removeEventListener('mousedown', pswipeStart);
    }
  }

  pscreenWidth();
