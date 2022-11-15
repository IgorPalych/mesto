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
const addButton = document.querySelector('.profile__button_action_add-place')


// Попапы и кнопки их вызова и закрытия
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editProfileButton = document.querySelector('.profile__button_action_edit-profile');
const closeEditButton = document.querySelector('.popup__close-button_type_edit-profile');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const addPlaceButton = document.querySelector('.profile__button_action_add-place');
const closeAddButton = document.querySelector('.popup__close-button_type_add-place');




// Шаблоны
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


// Генерация карточки
const generateCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.card__title').textContent = item.name;
  newCard.querySelector('.card__image').src = item.link;
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


function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// Открыть и закрыть попапы
editProfileButton.addEventListener('click', function () {
  openPopup(document.querySelector('.popup_type_edit-profile'));
});

addPlaceButton.addEventListener('click', () => {   // то же, только стрелочный колбэк
  openPopup(document.querySelector('.popup_type_add-place'));
});

closeEditButton.addEventListener('click', () => {
  closePopup(document.querySelector('.popup_type_edit-profile'));
});

closeAddButton.addEventListener('click', () => {
  closePopup(document.querySelector('.popup_type_add-place'));
});





/* function openPopup() {
  let name = userName.textContent;
  let job = userJob.textContent;
  popupElement.classList.add('popup_opened');
  nameInput.value = name;
  jobInput.value = job;
} */
