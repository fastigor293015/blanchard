var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");

im.mask(selector);

new JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 10,
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
  },
  messages: {
    name: {
      required: 'Заполните это поле',
      minLength: 'Введите от 2 до 15 символов',
      maxLength: 'Введите от 2 до 15 символов',
    },
    tel: {
      required: 'Заполните это поле',
      function: 'Введите полный номер'
    },
  },
  colorWrong: '#D11616',

  submitHandler: function (form, values, ajax) {
    ajax({
        url: '/mail.php',
        method: 'POST',
        data: values,
        async: true,
        callback: function (response) {
            alert('AJAX submit successful! \nResponse from server:' + response)
        },
        error: function (response) {
            alert('AJAX submit error! \nResponse from server:' + response)
        }
    });
  },
});
