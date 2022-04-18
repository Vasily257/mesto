import { initialCards } from './cards.js';
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

// Popups

// Functions for closing popups

function closePopup(popup) {
  document.removeEventListener('keydown', handleClosePopupEscKey);
  popup.classList.remove('popup_opened');
}

// Handler for closing a popups with esc key

function handleClosePopupEscKey(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopupOpened(popupOpened);
  }
}

// Functions for opening popups

function openPopup(popup) {
  document.addEventListener('keydown', handleClosePopupEscKey);
  popup.classList.add('popup_opened');
}

// Listeners for opening a popup with click to button

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);
buttonForAddingCard.addEventListener('click', handleButtonForAddingCard);

function handleButtonForEditingProfile() {
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;

  // enableButton(buttonSubmitPopupEditing, 'popup__submit-button_disabled');
  // resetPopupErrors(popupEditing);
  openPopup(popupEditing);
}

function handleButtonForAddingCard() {
  formOfAddingPopup.reset();

  // disableButton(buttonSubmitPopupAdding, 'popup__submit-button_disabled');
  // resetPopupErrors(popupAdding);
  openPopup(popupAdding);
}

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

// Rendering of card

function renderCard(data) {
  const newCard = new Card(data, '.places-template');
  const cardElement = newCard.generateCard();

  cardsContainer.prepend(cardElement);
}

// Initial rendering of cards

initialCards.reverse().forEach(renderCard);

// Add a submit listener for forms

formOfEditingPopup.addEventListener('submit', handleSubmitOfEditingForm);
formOfAddingPopup.addEventListener('submit', handleSubmitOfAddingForm);

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

// Start form validation

const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

Array.from(forms).forEach((formElement) => {
  const formValidate = new FormValidator(config, '.popup__form');
  formValidate.enableValidation(formElement);
});

// exports

export { openPopup };
