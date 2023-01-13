import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
const inputJobID = 'job-input';


// Попап и кнопка профиля
// const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__button_action_edit-profile');
const profileForm = document.forms['profile-form'];

// Попап и кнопка добавления карточки
//const popupAddPlace = document.querySelector('.popup_type_add-place');
const buttonAddPlace = document.querySelector('.profile__button_action_add-place');
const cardForm = document.forms['card-form'];


// Профиль пользователя
const nameElementSelector = '.profile__name';
const jobElementSelector = '.profile__job';

// HTML-элемент списка карточек
const cardsListElement = document.querySelector('.cards-list');




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


const userInfo = new UserInfo({ name: nameElementSelector, job: jobElementSelector });


// Попапы с формами

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (values) => {
    const userData = {};
    userData.name = values[inputNameID];
    userData.job = values[inputJobID];
    userInfo.setUserInfo(userData);
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
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
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







