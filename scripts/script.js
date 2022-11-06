// Получаем ссылки на элемент "popup" и кнопки "Редактировать профиль" и "Закрыть popup"
let popupElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button_action_edit');
let closeButton = document.querySelector('.popup__close');

// Находим профиль пользователя в DOM
let userProfile = document.querySelector('.profile');
// Получаем текстовое содержимое элементов профиля
let userName = userProfile.querySelector('.profile__name');
let userJob = userProfile.querySelector('.profile__job');

// Находим форму в DOM
let formElement = document.querySelector('.form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  let name = nameInput.value;
  let job = jobInput.value;
  // Получаем значение полей jobInput и nameInput из свойства value

  if (name === '' || job === '') {
    return;
  } else {
    userName.textContent = name;
    userJob.textContent = job;
    closePopup();
  }
}

function openPopup() {
  let name = userName.textContent;
  let job = userJob.textContent;
  popupElement.classList.add('popup_opened');
  nameInput.value = name;
  jobInput.value = job;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Прикрепляем обработчик к кнопке "Редактировать"
editButton.addEventListener('click', openPopup);

// Прикрепляем обработчик к элементу "popup" и кнопке "Закрыть popup"
closeButton.addEventListener('click', closePopup);
