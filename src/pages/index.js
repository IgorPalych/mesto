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
  cardTemplateID,
  profileNameInput,
  profileJobInput,
  popupWithImageSelector,
  popupPlaceFormSelector,
  popupEditProfileSelector,
  buttonEditProfile,
  buttonAddPlace,
  nameFieldSelector,
  jobFieldSelector,
  validationSettings
} from '../scripts/constants.js';


const formValidators = {}

// Включение валидации
const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);


// Экземпляр класса для управления профилем пользователя
const userInfo = new UserInfo({ name: nameFieldSelector, job: jobFieldSelector });


// Создать карточку
const createCard = (data) => {
  const card = new Card({
    data,
    handleCardClick: () => {
      popupWithImage.open(data);
    }
  }, cardTemplateID);
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

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();


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
  formValidators['profile-form'].resetValidation();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

buttonAddPlace.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupAddPlace.open();
});






