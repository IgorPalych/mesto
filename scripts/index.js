import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
export { viewCard };


/*---------------- ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ ----------------*/

// HTML-элементы форм
const formList = Array.from(document.querySelectorAll('.form'));

// Попап и кнопка профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const buttonEditProfile = document.querySelector('.profile__button_action_edit-profile');

const profileForm = document.forms['profile-form'];
const inputName = profileForm.querySelector('.form__input_el_name');
const inputJob = profileForm.querySelector('.form__input_el_job');

// Попап и кнопка добавления карточки
const popupAddPlace = document.querySelector('.popup_type_add-place');

const buttonAddPlace = document.querySelector('.profile__button_action_add-place');

const cardForm = document.forms['card-form'];
const inputTitle = cardForm.querySelector('.form__input_el_place-title');
const inputURL = cardForm.querySelector('.form__input_el_place-image-src');

// Попап и кнопка просмотра карточки
const popupViewCard = document.querySelector('.popup_type_view-card');

const viewCardImage = popupViewCard.querySelector('.popup__image');
const viewCardFigcaption = popupViewCard.querySelector('.popup__figcaption');

// Коллекция кнопок "Закрыть попап"
const closeButtons = document.querySelectorAll('.popup__close');

// Профиль пользователя
const userProfile = document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__name');
const userJob = userProfile.querySelector('.profile__job');

// HTML-элемент списка карточек
const cardsList = document.querySelector('.cards-list');

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

// Настройки валидации
const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
}

/*---------------- ФУНКЦИИ ---------------*/

// Показать карточку
function viewCard(link, name) {
  viewCardImage.src = link;
  viewCardImage.alt = `${name}.`;
  viewCardFigcaption.textContent = name;
  openPopup(popupViewCard);
}

// Отрисовать карточки
function renderCard(item) {
  const card = new Card(item);
  cardsList.prepend(card.getView());
};

// Обработчики отправки формы
function submitProfileForm(event) {
  event.preventDefault();
  if (inputName.value === '' || inputJob.value === '') {
    return;
  } else {
    userName.textContent = inputName.value;
    userJob.textContent = inputJob.value;
    closePopup(popupEditProfile);
  }
}

function submitPlaceForm(event) {
  event.preventDefault();
  if (inputTitle.value === '' || inputURL.value === '') {
    return;
  } else {
    const placeInfo = {};
    placeInfo.name = inputTitle.value;
    placeInfo.link = inputURL.value;
    event.target.reset()
    renderCard(placeInfo);
    closePopup(popupAddPlace);
  }
}

function disabledFormSubmit(popupElement) {
  const buttonFormSubmit = popupElement.querySelector('.form__submit');
  buttonFormSubmit.setAttribute('disabled', true);
  buttonFormSubmit.classList.add('form__submit_disabled');
}

// Редактировать профиль
function editProfile() {
  openPopup(popupEditProfile);
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  disabledFormSubmit(popupEditProfile);
}

// Открыть/Закрыть попап
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handleHotkey);
  document.addEventListener('click', handleOverlayClick);
}

function closePopup(popupName) {
  document.removeEventListener('keydown', handleHotkey);
  popupName.classList.remove('popup_opened');
}

// Обработчик клика по оверлею
function handleOverlayClick(event) {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup && event.target === activePopup) {
    closePopup(activePopup);

  }
}

// Обработчик нажатия кнопки Escape
function handleHotkey(event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}


/*----------------- ВЫЗОВ ФУНКЦИЙ --------------------*/

// Отрисовать все карточки
initialCards.forEach(renderCard);

formList.forEach(item => {
  const formElement = new FormValidator(settings, item)
  formElement.enableValidation();
});

// Отправить формы
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitPlaceForm);


// Открыть и Закрыть попапы
buttonEditProfile.addEventListener('click', editProfile);
buttonAddPlace.addEventListener('click', () => {
  openPopup(popupAddPlace);
  disabledFormSubmit(popupAddPlace);
});

closeButtons.forEach((button) => {
  // найти ближайший к крестику попап
  const popup = button.closest('.popup');
  // установить обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


