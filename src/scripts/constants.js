export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    'Content-type': 'application/json',
    authorization: 'bed2d048-004a-4293-8e7d-f5ce02aae8c0'
  }
}

// DOM-элемент списка карточек
export const cardsListElement = document.querySelector('.cards-list');


// DOM-элементы кнопок редактирования профиля и добавления карточки
export const buttonEditAvatar = document.querySelector('.profile__button_action_edit-avatar')
export const buttonEditProfile = document.querySelector('.profile__button_action_edit-profile');
export const buttonAddPlace = document.querySelector('.profile__button_action_add-place');


// DOM-элементы форм и селекторы полей форм
export const profileForm = document.forms['profile-form'];
export const profileNameInput = profileForm.querySelector('.form__input_el_name');
export const profileJobInput = profileForm.querySelector('.form__input_el_job');

export const cardForm = document.forms['card-form'];
export const placeTitleInput = cardForm.querySelector('.form__input_el_place-title');
export const placeImageInput = cardForm.querySelector('.form__input_el_place-image');


// Селекторы попапов
export const popupWithImageSelector = '.popup_type_view-card';
export const popupPlaceFormSelector = '.popup_type_add-place';
export const popupEditAvatarSelector = '.popup_type_edit-avatar'
export const popupEditProfileSelector = '.popup_type_edit-profile';


// Селектор
export const cardTemplateID = '#card-template';


// Селекторы элементов профиля пользователя
export const nameFieldSelector = '.profile__name';
export const aboutFieldSelector = '.profile__about';
export const avatarFieldSelector = '.profile__avatar';


// Настройки валидации
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
}
