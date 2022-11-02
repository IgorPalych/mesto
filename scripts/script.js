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
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_el_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.form__item_el_job'); // Воспользуйтесь инструментом .querySelector()


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  let name = nameInput.value;
  let job = jobInput.value;
  // Получите значение полей jobInput и nameInput из свойства value

  if (name === '' || job === '') {
    return;
  } else {
    userName.textContent = name;
    userJob.textContent = job;
    popupElement.classList.remove('popup_opened');
  }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



function openPopup() {
  let name = userName.textContent;
  let job = userJob.textContent;
  popupElement.classList.add('popup_opened');
  nameInput.setAttribute('placeholder', name);
  jobInput.setAttribute('placeholder', job);
}

function closePopup(event) {
  if (event.target === event.currentTarget) {
    popupElement.classList.remove('popup_opened');
  }
}

// Прикрепляем обработчик к кнопке "Редактировать"
editButton.addEventListener('click', openPopup);

// Прикрепляем обработчик к элементу "popup" и кнопке "Закрыть popup"
closeButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopup);
