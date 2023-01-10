export default class Card {
  constructor({ data, handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector('#card-template')
      .content.querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }

  _setData() {
    const cardTitle = this._newCard.querySelector('.card__title');
    const cardImage = this._newCard.querySelector('.card__image');

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `${this._name}.`;
  }

  _likeCard() {
    const likeButton = this._newCard.querySelector('.card__like');
    likeButton.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _setEventListeners() {
    const likeButton = this._newCard.querySelector('.card__like');
    likeButton.addEventListener('click', () => { this._likeCard() });

    const deleteButton = this._newCard.querySelector('.card__delete');
    deleteButton.addEventListener('click', () => { this._deleteCard() });

    const cardImage = this._newCard.querySelector('.card__image');
    cardImage.addEventListener('click', () => { this._handleCardClick(); });
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}
