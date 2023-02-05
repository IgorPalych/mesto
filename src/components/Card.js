export default class Card {
  constructor({ data, userName, handleCardClick, handleDeleteClick }, templateID) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardOwnerId = data.owner.name;
    this._userName = userName;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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

  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => { this._likeCard(this._cardLike) });
    this._cardDelete.addEventListener('click', () => { this._handleDeleteClick(this._id) });
    this._cardImage.addEventListener('click', () => { this._handleCardClick(); });
  }

  _hasDeleteButton() {
    if (this._userName !== this._cardOwnerId) {
      this._cardDelete.remove();
    }
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector('.card__title');
    this._cardImage = this._newCard.querySelector('.card__image');
    this._cardLike = this._newCard.querySelector('.card__like');
    this._cardDelete = this._newCard.querySelector('.card__delete');

    this._hasDeleteButton()
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}
