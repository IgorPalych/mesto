import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

import './index.css';

import {
  cardsData,
  cardsListElement,
  profileNameInput,
  profileJobInput,
  popupWithImageSelector,
  popupPlaceFormSelector,
  popupEditProfileSelector,
  buttonEditProfile,
  buttonAddPlace,
  nameFieldSelector,
  jobFieldSelector,
  profileForm,
  cardForm,
  validationSettings
} from '../scripts/constants.js';


// Установить валидацию форм
const validatorProfileForm = new FormValidator(validationSettings, profileForm);
validatorProfileForm.enableValidation();

const validatorPlaceForm = new FormValidator(validationSettings, cardForm);
validatorPlaceForm.enableValidation();


// Экземпляр класса для управления профилем пользователя
const userInfo = new UserInfo({ name: nameFieldSelector, job: jobFieldSelector });


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
    userInfo.setUserInfo(values);
  }
}, popupEditProfileSelector);

popupEditProfile.setEventListeners();


const popupAddPlace = new PopupWithForm({
  handleFormSubmit: (values) => {
    cardsList.addItem(createCard(values));
  }
}, popupPlaceFormSelector);

popupAddPlace.setEventListeners();


// Установить слушатели на кнопки editProfile и add Place

buttonEditProfile.addEventListener('click', () => {
  validatorProfileForm.toggleButtonState();
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;
  popupEditProfile.open();
});

buttonAddPlace.addEventListener('click', () => {
  validatorPlaceForm.toggleButtonState();
  popupAddPlace.open();
});






