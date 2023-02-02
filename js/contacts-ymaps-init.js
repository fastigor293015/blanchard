// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
  // Создание карты.
  var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.758463, 37.601079],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 14
  }, {
    autoFitToViewport: 'always'
  });

  var myPlacemark = new ymaps.Placemark([55.758463, 37.601079], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg', /* Вводим путь к своей картинке */
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);

  Size();
  myMap.container.fitToViewport();
  window.addEventListener('resize', function() {
    Size();
    myMap.container.fitToViewport();
  });
}

function Size() {
  var x = document.documentElement.clientWidth;
  if (x > 660) {
    document.querySelector('.ymaps-2-1-79-map').style.height = 700 + 'px';
  } else if (x > 460 && x <= 660) {
    document.querySelector('.ymaps-2-1-79-map').style.height = 500 + 'px';
  } else {
    document.querySelector('.ymaps-2-1-79-map').style.height = 317 + 'px';
  }
}
