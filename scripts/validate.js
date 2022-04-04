// Validation of forms

// Reset popup errors

function resetPopupErrors(popup) {
  popup.querySelectorAll('.popup__input').forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });

  popup.querySelectorAll('.popup__error').forEach((errorElement) => {
    errorElement.classList.remove('popup__error_active');
    errorElement.textContent = '';
  });
}

// Disable and enable submit button

function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(inactiveButtonClass);
}

// Сhange the state of the sumbit button

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
}

// Showing and hiding errors

function showInputError(inputElement, formElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(inputElement, formElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

// Сheck the validity of the inputs

function isValid(inputElement, formElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, formElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(inputElement, formElement, rest);
  }
}

// Сonfigure the callback of the input listeners

function setEventListeners(
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

// Add listeners to forms

function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
}

// Start forms validation

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
});
