// Проверить валидность заполнения всех полей
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

// Включить / отключить кнопку формы
function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__submit_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__submit_disabled');
  }
};


// Показать ошибку заполнения поля
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__error_visible');

}


// Убрать ошибку заполнения поля
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__error_visible');
}


// Проверить валидность заполнения поля
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};


// Установить обработчики проверки на поля формы
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
}


// Запустить установку обработчиков всем формам
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(formElement => {
    setEventListener(formElement);
  });
}


enableValidation();







