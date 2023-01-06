import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { cardsData, settings } from '../scripts/constants.js';
export { viewCard };


/*s----Array------------ ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ ----------------*/

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
const cardsListElement = document.querySelector('.cards-list');



/*---------------- ФУНКЦИИ ---------------*/



// Показать карточку
function viewCard(link, name) {
  viewCardImage.src = link;
  viewCardImage.alt = `${name}.`;
  viewCardFigcaption.textContent = name;
  openPopup(popupViewCard);
}


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

// Открыть/Закрыть попап
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handleHotkey);
  document.addEventListener('click', handleOverlayClick);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleHotkey);
  document.addEventListener('click', handleOverlayClick);
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


/*------------ УСТАНОВКА СЛУШАТЕЛЕЙ ---------*/

buttonEditProfile.addEventListener('click', editProfile);
buttonAddPlace.addEventListener('click', () => { openPopup(popupAddPlace); });

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitPlaceForm);


/*----------- ЗАПУСК ЦИКЛОВ и ВЫЗОВ ФУНКЦИЙ ----------*/


const cardsList = new Section({
  items: cardsData,
  renderer: (item) => {
    const card = new Card(item);
    const cardElement = card.getCardView();
    cardsList.addItem(cardElement);
  }
}, cardsListElement);

cardsList.renderItems();



const validatorProfileForm = new FormValidator(settings, profileForm); //
const validatorPlaceForm = new FormValidator(settings, cardForm);

validatorProfileForm.enableValidation();
validatorPlaceForm.enableValidation();







