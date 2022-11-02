

const popupElement = document.querySelector('.popup'); // получить ссылку на попап
const editButton = document.querySelector('.profile__button_action_edit'); // получить ссылку на кнопку "Редактировать профиль"
const closeButton = document.querySelector('.popup__close'); // получить ссылку на кнопку "Закрыть попап"

const inputUser = document.querySelector('.form__item_el_name') // получить ссылку на поле формы "Имя пользователя"
const inputJob = document.querySelector('.form__item_el_job') // получить ссылку на поле формы "Род деятельности пользователя"

const userName = document.querySelector('.profile__user').textContent; // получить текст имени пользователя
const userJob = document.querySelector('.profile__job').textContent; //получить текст рода занятий пользователя


console.log(userName);
console.log(userJob);

function openPopup() {
  popupElement.classList.add('popup_opened');
  inputUser.setAttribute('placeholder', userName);
  inputJob.setAttribute('placeholder', userJob);
}

function closePopup(event) {
  if (event.target === event.currentTarget) {
    popupElement.classList.remove('popup_opened');
  }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopup);
