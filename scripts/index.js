import { initialCards } from './cards.js';

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

const popupEnlarging = document.querySelector('.popup_type_enlarge');
const popupImage = popupEnlarging.querySelector('.popup__image');
const popupImageContainer = popupEnlarging.querySelector('.popup__image-container');
const popupImageCaption = popupEnlarging.querySelector('.popup__image-caption');

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

function handleButtonForEditingProfile() {
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;

  enableButton(buttonSubmitPopupEditing, 'popup__submit-button_disabled');
  resetPopupErrors(popupEditing);
  openPopup(popupEditing);
}

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);

function handleButtonForAddingCard() {
  formOfAddingPopup.reset();

  disableButton(buttonSubmitPopupAdding, 'popup__submit-button_disabled');
  resetPopupErrors(popupAdding);
  openPopup(popupAdding);
}

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

class Card {
  constructor(data) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.places-template')
      .content.querySelector('.places__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._element.querySelector('.places__title');
    const cardImage = this._element.querySelector('.places__image');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    return this._element;
  }

  _setEventListeners() {
    const buttonToLike = this._element.querySelector('.places__like-button');
    const buttonToDelete = this._element.querySelector('.places__delete-button');
    const buttonToEnlarge = this._element.querySelector('.places__enlarge-button');

    buttonToLike.addEventListener('click', () => {
      this._handleButtonToLike;
    });

    buttonToDelete.addEventListener('click', () => {
      this._handleButtonToDelete;
    });
    buttonToEnlarge.addEventListener('click', () => {
      this._handleButtonToEnlarge;
    });
  }

  _handleButtonToLike() {
    buttonToLike.classList.toggle('places__like-button_active');
  }

  _handleButtonToDelete() {
    buttonToDelete.closest('.places__item').remove();
  }

  _handleButtonToEnlarge() {
    popupImageCaption.textContent = this._title;
    popupImage.src = this._link;
    popupImage.alt = this._alt;
    openPopup(popupEnlarging);
  }
}

initialCards.reverse().forEach((card) => {
  const newCard = new Card(card);
  const cardElement = newCard.generateCard();

  cardsContainer.prepend(cardElement);
});

// Creating of card

function createCard(data) {
  const cardElement = document
    .querySelector('.places-template')
    .content.firstElementChild.cloneNode(true);

  // Cards elements

  const cardTitle = cardElement.querySelector('.places__title');
  const buttonToLike = cardElement.querySelector('.places__like-button');
  const buttonToDelete = cardElement.querySelector('.places__delete-button');
  const cardImage = cardElement.querySelector('.places__image');
  const buttonToEnlarge = cardElement.querySelector('.places__enlarge-button');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Сards handlers and listeners

  function handleButtonToLike() {
    buttonToLike.classList.toggle('places__like-button_active');
  }

  buttonToLike.addEventListener('click', handleButtonToLike);

  function handleButtonToDelete() {
    buttonToDelete.closest('.places__item').remove();
  }

  buttonToDelete.addEventListener('click', handleButtonToDelete);

  function handleButtonToEnlarge() {
    popupImageCaption.textContent = data.name;
    popupImage.src = data.link;
    popupImage.alt = data.name;
    openPopup(popupEnlarging);
  }

  buttonToEnlarge.addEventListener('click', handleButtonToEnlarge);

  return cardElement;
}

// Rendering of card

function renderCard(data) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}

// Initial rendering of cards

initialCards.reverse().forEach(renderCard);

// Form submission handlers

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

// Add a submit listener for forms

formOfEditingPopup.addEventListener('submit', handleSubmitOfEditingForm);
formOfAddingPopup.addEventListener('submit', handleSubmitOfAddingForm);
