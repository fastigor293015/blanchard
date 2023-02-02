var container = document.querySelector('.editions__checkbox-container');
    i = 0;
    spoiler = document.querySelector('.editions__checkbox-spoiler');

function checkBox() {
  document.querySelectorAll("input[type='checkbox']").forEach(function(check) {
    var label = check.closest('.editions__checkbox-label');
        h = label.offsetHeight;
    if (check.checked == true) {
      label.style.display = 'flex';
      setTimeout(() => {
        label.style.opacity = 1;
      }, 10);
      i++;
      container.style.maxHeight = i * h + 'px';
      label.classList.add('editions__checkbox-label_active');
    } else {
      label.style.opacity = 0;
      setTimeout(() => {
        label.style.display = 'none';
      }, 500);
      label.classList.remove('editions__checkbox-label_active');
    }
  })
  i = 0;
}

function checkBoxClick() {
  event.currentTarget.classList.toggle('editions__checkbox-spoiler_active');
  container.classList.toggle('editions__checkbox-container_active');
  document.querySelectorAll("input[type='checkbox']").forEach(function(check) {
    var label = check.closest('.editions__checkbox-label');
        h = label.offsetHeight;
    if (container.classList.contains('editions__checkbox-container_active') == false) {
      if (check.checked == true) {
        label.style.display = 'flex';
        setTimeout(() => {
          label.style.opacity = 1;
        }, 10);
        i++;
        container.style.maxHeight = i * h + 'px';
        label.classList.add('editions__checkbox-label_active');
      } else {
        label.style.opacity = 0;
        setTimeout(() => {
          label.style.display = 'none';
        }, 500);
        label.classList.remove('editions__checkbox-label_active');
        container.style.maxHeight = i * h + 'px';
      }
    } else {
      label.style.display = 'flex';
      setTimeout(() => {
        label.style.opacity = 1;
      }, 10);
      container.style.maxHeight = '1000px';
      label.classList.remove('editions__checkbox-label_active');
    }
  })
  i = 0;
}

function LabelClick() {
  var label = event.currentTarget;
  if (label.classList.contains('editions__checkbox-label_active') == true) {
    label.classList.remove('editions__checkbox-label_active');
    var st = container.style.maxHeight;
        h = event.offsetHeight;
    label.style.opacity = 0;
    setTimeout(() => {
      label.style.display = 'none';
    }, 500);
    container.style.maxHeight = st - h + 'px';
  }
}

function scrWidth() {
  var w = document.documentElement.clientWidth;
  if (container.classList.contains('editions__checkbox-container_active') == true) {
    container.classList.remove('editions__checkbox-container_active');
  }
  if (spoiler.classList.contains('editions__checkbox-spoiler_active') == true) {
    spoiler.classList.remove('editions__checkbox-spoiler_active');
  }
  if (w > 460) {
    container.style.maxHeight = '';
    spoiler.removeEventListener('click', checkBoxClick);
    spoiler.removeAttribute('tabIndex');
    document.querySelectorAll('.editions__checkbox-label').forEach(function(item) {
      item.style.display = 'flex';
      item.style.opacity = 1;
      item.removeEventListener('click', LabelClick);
    })
  } else {
    checkBox();
    spoiler.addEventListener('click', checkBoxClick);
    spoiler.setAttribute('tabIndex', '68');
    document.querySelectorAll('.editions__checkbox-label').forEach(function(item) {
      item.addEventListener('click', LabelClick);
    })
  }
}

scrWidth();
window.addEventListener('resize', scrWidth);
