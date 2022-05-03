import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleSubmitForm = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._submitButtonElement = this._popup.querySelector('.popup__submit-button');
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  getPopupForm() {
    return this._formElement;
  }

  getSubmitButton() {
    return this._submitButtonElement;
  }

  setInputValues(profileData) {
    this._inputList.forEach((input) => {
      input.value = profileData[input.name];
    });
  }
}
