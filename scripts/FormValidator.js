export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorSelector = config.errorSelector;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formSelector = formSelector;
  }

  _enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }

  _setEventListeners(
    formElement,
    { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(inputElement, formElement, rest);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
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

  // Disable and enable submit button

  _disableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  _enableButton(buttonElement, inactiveButtonClass) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }

  // Сhange the state of the sumbit button

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, inactiveButtonClass);
    } else {
      enableButton(buttonElement, inactiveButtonClass);
    }
  }

  // Showing and hiding errors

  _showInputError(inputElement, formElement, errorMessage, { inputErrorClass, errorClass }) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(inputElement, formElement, { inputErrorClass, errorClass }) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  // Сheck the validity of the inputs

  _isValid(inputElement, formElement, rest) {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, formElement, inputElement.validationMessage, rest);
    } else {
      hideInputError(inputElement, formElement, rest);
    }
  }

  // Сonfigure the callback of the input listeners

  // Add listeners to forms

  // Start forms validation

  // enableValidation({
  //   formSelector: '.popup__form',
  //   inputSelector: '.popup__input',
  //   inputErrorClass: 'popup__input_type_error',
  //   errorSelector: '.popup__error',
  //   errorClass: 'popup__error_active',
  //   submitButtonSelector: '.popup__submit-button',
  //   inactiveButtonClass: 'popup__submit-button_disabled',
  // });
}
