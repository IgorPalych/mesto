import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import './index.css';

import {
  configApi,
  cardsListElement,
  cardTemplateID,
  popupWithImageSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupAddPlaceSelector,
  popupDeletePlaceSelector,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddPlace,
  nameFieldSelector,
  aboutFieldSelector,
  avatarFieldSelector,
  validationSettings
} from '../scripts/constants.js';

// API
const api = new Api(configApi);

// здесь будем хранить id пользователя
let userId;

// Экземпляр класса для управления отображением профиля пользователя
const userInfo = new UserInfo({ name: nameFieldSelector, about: aboutFieldSelector, avatar: avatarFieldSelector });

Promise.all([api.getProfileData(), api.getInitialCards()])
  .then(([profileData, cardsData]) => {
    userId = profileData._id;  // записываем id пользователя в переменную
    userInfo.renderUserInfo(profileData); // отрисовываем инормацию о пользователе
    userInfo.renderAvatar(profileData); // отрисовываем аватар
    const cardsList = new Section({
      items: cardsData,
      renderer: (item) => {
        cardsList.addItem(createCard(item));
      }
    }, cardsListElement);
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


// Создаем карточку
const createCard = (cardData) => {
  const card = new Card({
    cardData,
    userId,
    handleCardImageClick: () => {
      popupWithImage.open(cardData.name, cardData.link);
    },
    handleDeleteIconClick: (cardId) => {
      popupDeletePlace.handleSendConfirmation(() => {
        api.deletePlace(cardId)
          .then(() => {
            card.deleteCard();
            popupDeletePlace.close();
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      });
      popupDeletePlace.open()
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((cardData) => { card.handleLike(cardData); })
        .catch((err) => { console.log(`Ошибка: ${err}`); });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((cardData) => { card.handleLike(cardData); })
        .catch((err) => { console.log(`Ошибка: ${err}`); });
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


// Попапы

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();


const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: (inputValues) => {
    popupEditAvatar.loading(true);
    api.setAvatar(inputValues)
      .then((userData) => {
        userInfo.renderAvatar(userData);
        popupEditAvatar.close();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => popupEditAvatar.loading(false));
  }
}, popupEditAvatarSelector);
popupEditAvatar.setEventListeners();


const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (inputValues) => {
    popupEditProfile.loading(true);
    api.editUserInfo(inputValues)
      .then((userData) => {
        userInfo.renderUserInfo(userData)
        popupEditProfile.close();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => popupEditProfile.loading(false));
  }
}, popupEditProfileSelector);
popupEditProfile.setEventListeners();


const popupAddPlace = new PopupWithForm({
  handleFormSubmit: (inputValues) => {
    popupAddPlace.loading(true);
    api.addPlace(inputValues)
      .then((cardData) => {
        cardsListElement.prepend(createCard(cardData));
        popupAddPlace.close();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => { popupAddPlace.loading(false) });

  }
}, popupAddPlaceSelector);
popupAddPlace.setEventListeners();


const popupDeletePlace = new PopupWithConfirmation(
  popupDeletePlaceSelector
);
popupDeletePlace.setEventListeners();


// Устанавливаем слушатели на кнопки профиля

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
  formValidators['new-place-form'].resetValidation();
  popupAddPlace.open();
});






