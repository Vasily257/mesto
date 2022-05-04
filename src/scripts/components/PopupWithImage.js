import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open() {
    this._popupImageCaption.textContent = this._name;
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;

    super.open();
  }
}
