// Попапы и кнопки вызова и закрытия попапов
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editProfileButton = document.querySelector('.profile__button_action_edit-profile');
const closeEditProfileButton = document.querySelector('.popup__close-button_type_edit-profile');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const addPlaceButton = document.querySelector('.profile__button_action_add-place');
const closeAddPlaceButton = document.querySelector('.popup__close-button_type_add-place');

// Формы и поля ввода
const formEditProfile = document.querySelector('.form_type_edit-profile');
const inputName = formEditProfile.querySelector('.form__input_el_name');
const inputJob = formEditProfile.querySelector('.form__input_el_job');

const formAddPlace = document.querySelector('.form_type_add-place');
const inputTitle = formAddPlace.querySelector('.form__input_el_place-title');
const inputSrc = formAddPlace.querySelector('.form__input_el_place-image-src');

// Профиль пользователя
const userProfile = document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__name');
const userJob = userProfile.querySelector('.profile__job');

// Массив карточек
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

// HTML-элемент списка карточек
const cardsList = document.querySelector('.cards-list');

// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Удалить карточку
const deleteCard = (event) => {
  event.target.closest('.card').remove();
};

// Сгенерировать карточку
const generateCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.card__title').textContent = item.name;
  newCard.querySelector('.card__image').src = item.link;

  newCard.querySelector('.card__trash').addEventListener('click', deleteCard)
  return newCard;
};

// Отрисовать отдельную карточку
const renderCard = (item) => {
  cardsList.prepend(generateCard(item));
};

// Отрисовать все карточки
initialCards.forEach((item) => {
  renderCard(item);
});


// Обработчики отправки формы
function profileFormSubmit(event) {
  event.preventDefault();
  if (inputName.value === '' || inputJob.value === '') {
    return;
  } else {
    userName.textContent = inputName.value;
    userJob.textContent = inputJob.value;
    closePopup(popupEditProfile);
  }
}

function addPlaceFormSubmit(event) {
  event.preventDefault();
  if (inputTitle.value === '' || inputSrc.value === '') {
    return;
  } else {
    const placeInfo = {};
    placeInfo.name = inputTitle.value;
    placeInfo.link = inputSrc.value;
    renderCard(placeInfo);
    closePopup(popupAddPlace);
  }
}

// Редактировать профиль
function editProfile() {
  openPopup(popupEditProfile);
  inputName.value = userProfile.querySelector('.profile__name').textContent;
  inputJob.value = userProfile.querySelector('.profile__job').textContent;
}

// Открыть/Закрыть попап
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

// Отправить формы
formEditProfile.addEventListener('submit', profileFormSubmit);
formAddPlace.addEventListener('submit', addPlaceFormSubmit);


// Открыть и Закрыть попапы
editProfileButton.addEventListener('click', editProfile);
addPlaceButton.addEventListener('click', () => { openPopup(popupAddPlace); });
closeEditProfileButton.addEventListener('click', () => { closePopup(popupEditProfile); });
closeAddPlaceButton.addEventListener('click', () => { closePopup(popupAddPlace); });
