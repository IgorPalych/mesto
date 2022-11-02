const popupElement = document.querySelector('.popup');

const editButton = document.querySelector('.profile__button_action_edit');
const closeButton = document.querySelector('.popup__close');

function openPopup() {
  popupElement.classList.add('popup_opened');
}

function closePopup(event) {
  if (event.target === event.currentTarget) {
    popupElement.classList.remove('popup_opened');
  }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopup);
