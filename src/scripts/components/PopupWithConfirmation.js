import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._handleClickSubmit = {};
    this._submitButtonElement = this._popup.querySelector('.popup__submit-button');
    this._handleEnterSubmit = this._handleEnterSubmit.bind(this);
  }

  setHandler(handler) {
    this._handleClickSubmit = handler;
  }

  _handleEnterSubmit(event) {
    if (event.key === 'Enter') {
      this._handleClickSubmit();
    }
  }

  open() {
    super.open();
    document.addEventListener('keydown', this._handleEnterSubmit);
  }

  close() {
    super.close();
    document.removeEventListener('keydown', this._handleEnterSubmit);
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
