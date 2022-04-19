export default class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorSelector = config.errorSelector;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formSelector = formSelector;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement, formElement);
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  }

  _isValid(inputElement, formElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, formElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, formElement);
    }
  }

  _showInputError(inputElement, formElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement, formElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, this._inactiveButtonClass);
    } else {
      this._enableButton(buttonElement, this._inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  _enableButton(buttonElement) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _resetPopupErrors(popup) {
    popup.querySelectorAll(this._inputSelector).forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
    });

    popup.querySelectorAll(this._errorSelector).forEach((errorElement) => {
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    });
  }
}
