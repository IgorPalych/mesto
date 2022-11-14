const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// DOM-узлы
const cardsList = document.querySelector('.cards-list');


// Шаблоны
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Генерация карточки
const generateCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);

  const title = newCard.querySelector('.card__title');
  title.textContent = item.name;

  const image = newCard.querySelector('.card__image')
  image.src = item.link;

  return newCard;
}

// Отрисовка отдельной карточки
const renderCard = (item) => {
  cardsList.prepend(generateCard(item));
}

// Отрисовка всех карточек
initialCards.forEach((item) => {
  renderCard(item);
});


// обработчик отправки формы добавления новой карточки
/* const addCardSubmitHandler = (event) => {
  evt.preventDefault(); // отменить стандартную отправку формы.
  renderCard();
} */









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
