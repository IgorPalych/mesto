const formInputs = document.querySelectorAll('.form__input');

formInputs.forEach(element => {
  element.addEventListener('input', function (evt) {
    console.log(evt.target.validity.valid);
  });
});





