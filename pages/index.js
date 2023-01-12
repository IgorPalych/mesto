import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import { cardsData, settings } from '../scripts/constants.js';


/*------------- ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ ----------------*/

// Селекторы попапов
const popupWithImageSelector = '.popup_type_view-card';
const popupPlaceFormSelector = '.popup_type_add-place';
const popupEditProfileSelector = '.popup_type_edit-profile';

// Идентификаторы полей форм
const inputPlaceID = 'place-input';
const inputUrlID = 'url-input';
const inputNameID = 'name-input';
const inputJobID = 'url-input';


// Попап и кнопка профиля
// const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__button_action_edit-profile');
const profileForm = document.forms['profile-form'];

// Попап и кнопка добавления карточки
//const popupAddPlace = document.querySelector('.popup_type_add-place');
const buttonAddPlace = document.querySelector('.profile__button_action_add-place');
const cardForm = document.forms['card-form'];


// Профиль пользователя
const userProfile = document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__name');
const userJob = userProfile.querySelector('.profile__job');

// HTML-элемент списка карточек
const cardsListElement = document.querySelector('.cards-list');



/*---------------- ФУНКЦИИ ---------------*/


/* // Обработчики отправки формы
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
    renderCards(placeInfo);
    closePopup(popupAddPlace);
  }
  event.target.reset();
  validatorPlaceForm.toggleButtonState();
} */

/* // Редактировать профиль
function editProfile() {
  openPopup(popupEditProfile);
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
} */


// Создать карточку

const createCard = (data) => {
  const card = new Card({
    data,
    handleCardClick: () => {
      const popup = new PopupWithImage(data, popupWithImageSelector);
      popup.open();
      popup.setEventListeners();
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};


// Отрисовать карточки при загрузке страницы

const cardsList = new Section({
  items: cardsData,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, cardsListElement);

cardsList.renderItems();


// Попапы с формами

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (values) => {

    popupEditProfile.close();
  }
}, popupEditProfileSelector);



const popupAddPlace = new PopupWithForm({
  handleFormSubmit: (values) => {
    const placeInfo = {};
    placeInfo.name = values[inputPlaceID];
    placeInfo.link = values[inputUrlID];
    cardsList.addItem(createCard(placeInfo));
    popupAddPlace.close();
    validatorPlaceForm.toggleButtonState();
  }
}, popupPlaceFormSelector);



// Установить слушатели на кнопки editProfile и add Place

buttonEditProfile.addEventListener('click', () => {
  popupAddPlace.open();
  popupAddPlace.setEventListeners();
});


buttonAddPlace.addEventListener('click', () => {
  popupAddPlace.open();
  popupAddPlace.setEventListeners();
});


// Установить валидацию форм

const validatorProfileForm = new FormValidator(settings, profileForm); //
const validatorPlaceForm = new FormValidator(settings, cardForm);

validatorProfileForm.enableValidation();
validatorPlaceForm.enableValidation();







