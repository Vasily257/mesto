export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorSelector = config.errorSelector;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._errorList = Array.from(this._formElement.querySelectorAll(this._errorSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement, this._formElement);
        this._toggleButtonState(this._inputList, this._buttonElement, this._inactiveButtonClass);
      });
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._buttonElement, this._inactiveButtonClass);
    } else {
      this._enableButton(this._buttonElement, this._inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _enableButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _resetPopupErrors() {
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
    });

    this._errorList.forEach((errorElement) => {
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    });
  }

  initialDisableButton(buttonElement, inactiveButtonClass, popup) {
    this._disableButton(buttonElement, inactiveButtonClass);
    this._resetPopupErrors(popup);
  }

  initialEnableButton(buttonElement, inactiveButtonClass, popup) {
    this._enableButton(buttonElement, inactiveButtonClass);
    this._resetPopupErrors(popup);
  }
}
