export const profile = document.querySelector('.profile');
export const buttonForEditingProfile = profile.querySelector('.profile__edit-button');
export const buttonForAddingCard = profile.querySelector('.profile__add-button');

export const cardsSelector = '.places__list';

export const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

export const formValidators = {};
export const formList = Array.from(document.forms);
