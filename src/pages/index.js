import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import './index.css';

import {
  configApi,
  cardsListElement,
  cardTemplateID,
  popupWithImageSelector,
  popupPlaceFormSelector,
  popupEditProfileSelector,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddPlace,
  nameFieldSelector,
  aboutFieldSelector,
  avatarFieldSelector,
  validationSettings,
  popupEditAvatarSelector
} from '../scripts/constants.js';


// Экземпляр класса для управления профилем пользователя
const userInfo = new UserInfo({ name: nameFieldSelector, about: aboutFieldSelector, avatar: avatarFieldSelector });

const api = new Api(configApi);

// Получаем и отрисовываем данные пользователя
api.getProfileData()
  .then((data) => {
    userInfo.renderUserInfo(data);
    userInfo.renderAvatar(data);
  })
  .catch(err => console.log(`Ошибка: ${err}`)); // выведем ошибку в консоль


// Получаем и отрисовываем карточки

api.getInitialCards()
  .then((data) => {
    const cardsList = new Section({
      items: data,
      renderer: (item) => {
        cardsList.addItem(createCard(item));
      }
    }, cardsListElement);
    cardsList.renderItems();
  })
  .catch(err => console.log(`Ошибка: ${err}`));

// Создаем карточку
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

// Включаем валидацию форм

const formValidators = {}

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


// Попапы с формами

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();


const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: (values) => {
    api.saveAvatar(values)
      .then(data => userInfo.renderAvatar(data))
      .catch(err => console.log(`Ошибка: ${err}`));
  }
}, popupEditAvatarSelector);

popupEditAvatar.setEventListeners();


const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (values) => {
    console.log(values);
    api.editUserInfo(values)
      .then((data) => { userInfo.renderUserInfo(data); })
      .catch(err => console.log(`Ошибка: ${err}`));;
  }
}, popupEditProfileSelector);

popupEditProfile.setEventListeners();


const popupAddPlace = new PopupWithForm({
  handleFormSubmit: (values) => {
    cardsList.addItem(createCard(values));
  }
}, popupPlaceFormSelector);

popupAddPlace.setEventListeners();


// Устанавливаем слушатели на кнопки editProfile и add Place

buttonEditAvatar.addEventListener('click', () => {
  formValidators['avatar-form'].resetValidation();
  popupEditAvatar.open();
});

buttonEditProfile.addEventListener('click', () => {
  formValidators['profile-form'].resetValidation();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

buttonAddPlace.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupAddPlace.open();
});






