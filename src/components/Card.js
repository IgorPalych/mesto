export default class Card {
  constructor({ data, handleCardClick }, templateID) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateID = templateID;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateID)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardTemplate;
  }

  _setData() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name}.`;
  }

  _likeCard(buttonElement) {
    buttonElement.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => { this._likeCard(likeButton) });
    this._cardDelete.addEventListener('click', () => { this._deleteCard() });
    this._cardImage.addEventListener('click', () => { this._handleCardClick(); });
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector('.card__title');
    this._cardImage = this._newCard.querySelector('.card__image');
    this._cardLike = this._newCard.querySelector('.card__like');
    this._cardDelete = this._newCard.querySelector('.card__delete');

    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}
