export default class Card {
  constructor({ cardData, userId, handleCardImageClick, handleDeleteCard, handleSetLike, handleRemoveLike }, templateID) {
    this._placeName = cardData.name;
    this._placeImageLink = cardData.link;
    this._likes = cardData.likes;
    this._userId = userId;
    this._cardId = cardData._id;
    this._cardOwnerId = cardData.owner._id;

    this._handleDeleteCard = handleDeleteCard;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleCardImageClick = handleCardImageClick;

    this._templateID = templateID;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateID)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardTemplate;
  }

  _hasDeleteButton() {
    if (this._userId !== this._cardOwnerId) {
      this._cardDeleteButton.remove();
    }
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._cardLikeButton.classList.add('card__like-button_active');
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      if (this._cardLikeButton.classList.contains('card__like-button_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId)
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardImageClick();
    });
  }

  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  handleLike(cardData) {
    this._cardLikeButton.classList.toggle('card__like-button_active');
    this._likeCounter.textContent = cardData.likes.length;
  }

  generateCard() {
    this._newCard = this._getTemplate();

    this._cardTitle = this._newCard.querySelector('.card__title');
    this._cardImage = this._newCard.querySelector('.card__image');
    this._cardDeleteButton = this._newCard.querySelector('.card__delete-button');
    this._cardLikeButton = this._newCard.querySelector('.card__like-button');
    this._likeCounter = this._newCard.querySelector('.card__like-counter');

    this._cardTitle.textContent = this._placeName;
    this._cardImage.src = this._placeImageLink;
    this._cardImage.alt = `${this._placeName}.`;
    this._likeCounter.textContent = this._likes.length;

    this._isCardLiked();
    this._hasDeleteButton();
    this._setEventListeners();

    return this._newCard;
  }
}
