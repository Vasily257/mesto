import Popup from './Popup.js';
import { popupImage, popupImageCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    popupImageCaption.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;

    super.open();
  }
}
