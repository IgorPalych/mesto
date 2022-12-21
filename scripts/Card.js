import { viewCard } from './index.js';

export class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const card = document
      .querySelector('#card-template')
      .content.querySelector('.card')
      .cloneNode(true);

    return card;
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
    cardImage.addEventListener('click', () => { viewCard(this._link, this._name) });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}
