import { initialCards } from './initialCards.js';
import { openPopup, closePopup } from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');
const buttonForEditingProfile = profile.querySelector('.profile__edit-button');
const buttonForAddingCard = profile.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const forms = document.forms;

const popupEditing = document.querySelector('.popup_type_edit');
const formOfEditingPopup = forms.edit;
const namePopup = formOfEditingPopup.elements.name;
const jobPopup = formOfEditingPopup.elements.job;
const buttonSubmitPopupEditing = popupEditing.querySelector('.popup__submit-button');

const popupAdding = document.querySelector('.popup_type_add');
const formOfAddingPopup = forms.add;
const placePopup = formOfAddingPopup.elements.place;
const linkPopup = formOfAddingPopup.elements.link;
const buttonSubmitPopupAdding = popupAdding.querySelector('.popup__submit-button');

// Start form validation

const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

const validatorEditForm = new FormValidator(config, '.popup_type_edit');
const validatorAddForm = new FormValidator(config, '.popup_type_add');

validatorEditForm.enableValidation();
validatorAddForm.enableValidation();

// Popups

// Listeners for opening a popup with click to button

function handleButtonForEditingProfile() {
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;

  validatorEditForm.initialEnableButton(
    buttonSubmitPopupEditing,
    'popup__submit-button_disabled',
    popupEditing
  );

  openPopup(popupEditing);
}

function handleButtonForAddingCard() {
  formOfAddingPopup.reset();

  validatorAddForm.initialDisableButton(
    buttonSubmitPopupAdding,
    'popup__submit-button_disabled',
    popupAdding
  );

  openPopup(popupAdding);
}

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);
buttonForAddingCard.addEventListener('click', handleButtonForAddingCard);

// Listener for closing a popups with click

function handleClosePopupClick(event) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains('popup__close-button')
  ) {
    closePopup(event.target.closest('.popup'));
  }
}

popups.forEach((popup) => {
  popup.addEventListener('click', handleClosePopupClick);
});

// Cards (places)

function renderCard(data) {
  const newCard = new Card(data, '.place-template');
  const cardElement = newCard.generateCard();

  cardsContainer.prepend(cardElement);
}

initialCards.reverse().forEach(renderCard);

// Add a submit listener for forms

function handleSubmitOfEditingForm(event) {
  event.preventDefault();
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  closePopup(popupEditing);
}

function handleSubmitOfAddingForm(event) {
  event.preventDefault();
  const data = {
    name: placePopup.value,
    link: linkPopup.value,
  };
  renderCard(data);
  closePopup(popupAdding);
}

formOfEditingPopup.addEventListener('submit', handleSubmitOfEditingForm);
formOfAddingPopup.addEventListener('submit', handleSubmitOfAddingForm);

// exports

export { openPopup };
