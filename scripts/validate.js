// Validation of forms

// Сhange the state of the sumbit button

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
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

// Add an input listener for inputs

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

// Form submission handlers

function handleSubmitOfEditingForm() {
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  toggleButtonState(
    [namePopup, jobPopup],
    buttonSubmitPopupEditing,
    'popup__submit-button_disabled'
  );
  closePopup(popupEditing);
}

function handleSubmitOfAddingForm() {
  const data = {
    name: placePopup.value,
    link: linkPopup.value,
  };
  renderCard(data);
  toggleButtonState(
    [placePopup, linkPopup],
    buttonSubmitPopupAdding,
    'popup__submit-button_disabled'
  );
  closePopup(popupAdding);
}

function handleSubmitForms(event) {
  event.preventDefault();

  switch (event.target) {
    case formOfEditingPopup:
      handleSubmitOfEditingForm();
      break;
    case formOfAddingPopup:
      handleSubmitOfAddingForm();
      break;
  }
}

// Add a submit listener for forms

function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', handleSubmitForms);
    setEventListeners(formElement, rest);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
});
