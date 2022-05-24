import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._handleClickSubmit = {};
    this._submitButtonElement = this._popup.querySelector('.popup__submit-button');
  }

  setHandler(handler) {
    this._handleClickSubmit = handler;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButtonElement.addEventListener('click', () => {
      this._handleClickSubmit();
    });
  }

  getSubmitButton() {
    return this._submitButtonElement;
  }
}
