// Проверить валидность заполнения всех полей
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

// Включить / отключить кнопку формы
function toggleButtonState(inputList, buttonElement, settings) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделать кнопку неактивной
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    // иначе сделать кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// Показать ошибку заполнения поля
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);

}

// Убрать ошибку заполнения поля
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
}

// Проверить валидность заполнения поля
function isValid(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, показать ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    // Если проходит, скрыть ошибку
    hideInputError(formElement, inputElement, settings);
  }
};

// Установить обработчики проверки на поля формы
function setEventListener(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
  toggleButtonState(inputList, buttonElement, settings);
}


// Запустить установку обработчиков всем формам
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formElement => {
    setEventListener(formElement, settings);
  });
}


enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
});







