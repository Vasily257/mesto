import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleClickSubmit) {
    super(popupSelector);
    this._handleClickSubmit = handleClickSubmit;
    this._submitButtonElement = this._popup.querySelector('.popup__submit-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButtonElement.addEventListener('click', () => {
      this.changeHandler();
    });
  }

  changeHandler(handler) {
    return handler;
  }
}
