import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
    this._popupCaption = this._popup.querySelector('.popup__caption');
    this._popupImage = this._popup.querySelector('.popup__image');
  }

  open() {
    super.open();
    this._popupCaption.textContent = this._name;
    this._popupImage.src = this._link;
    this._popupImage.alt = `${this._name}.`;
  }
}
