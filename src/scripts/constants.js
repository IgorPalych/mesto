// Массив карточек
export const cardsData = [
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


// DOM-элемент списка карточек
export const cardsListElement = document.querySelector('.cards-list');


// DOM-элементы кнопок редактирования профиля и добавления карточки
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
export const popupEditProfileSelector = '.popup_type_edit-profile';


// Селектор
export const cardTemplateID = '#card-template';


// Селекторы элементов профиля пользователя
export const nameFieldSelector = '.profile__name';
export const jobFieldSelector = '.profile__job';


// Настройки валидации
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
}
