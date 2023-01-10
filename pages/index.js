import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { cardsData, settings } from '../scripts/constants.js';


/*------------- ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ ----------------*/

// Селекторы попапов
const popupWithImageSelector = '.popup_type_view-card';


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



// Коллекция кнопок "Закрыть попап"
const closeButtons = document.querySelectorAll('.popup__close');

// Профиль пользователя
const userProfile = document.querySelector('.profile');
const userName = userProfile.querySelector('.profile__name');
const userJob = userProfile.querySelector('.profile__job');

// HTML-элемент списка карточек
const cardsListElement = document.querySelector('.cards-list');



/*---------------- ФУНКЦИИ ---------------*/


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
    renderCards(placeInfo);
    closePopup(popupAddPlace);
  }
  event.target.reset();
  validatorPlaceForm.toggleButtonState();
}

// Редактировать профиль
function editProfile() {
  openPopup(popupEditProfile);
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
}


/*------------ УСТАНОВКА СЛУШАТЕЛЕЙ ---------*/

buttonEditProfile.addEventListener('click', editProfile);
buttonAddPlace.addEventListener('click', () => { openPopup(popupAddPlace); });

profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitPlaceForm);


/*----------- ЗАПУСК ЦИКЛОВ и ВЫЗОВ ФУНКЦИЙ ----------*/


// Отрисовать карточки

const cardsList = new Section({
  items: cardsData,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const popup = new PopupWithImage(item, popupWithImageSelector);
        popup.open();
        popup.setEventListeners();
      }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, cardsListElement);

cardsList.renderItems();








const validatorProfileForm = new FormValidator(settings, profileForm); //
const validatorPlaceForm = new FormValidator(settings, cardForm);

validatorProfileForm.enableValidation();
validatorPlaceForm.enableValidation();







