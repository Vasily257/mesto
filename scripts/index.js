const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');
const buttonForEditingProfile = profile.querySelector('.profile__edit-button');
const buttonForAddingCard = profile.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const popupEditing = document.querySelector('.popup_type_edit');
const formOfEditingPopup = document.forms.edit;
const namePopup = formOfEditingPopup.elements.name;
const jobPopup = formOfEditingPopup.elements.job;
const buttonSubmitPopupEditing = popupEditing.querySelector('.popup__submit-button');

const popupAdding = document.querySelector('.popup_type_add');
const formOfAddingPopup = document.forms.add;
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
  popup.classList.remove('popup_opened');
}

// Listener for closing a popups with esc key

function closePopupOpened(popupOpened) {
  document.removeEventListener('keydown', handleClosePopupEscKey);
  closePopup(popupOpened);
}

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

// Listeners for opening a popup with click to button

function handleButtonForEditingProfile() {
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;

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

initialCards.reverse().forEach((item) => {
  renderCard(item);
});

// Form submission handlers

function handleSubmitOfEditingForm() {
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  closePopup(popupEditing);
}

function handleSubmitOfAddingForm() {
  const data = {
    name: placePopup.value,
    link: linkPopup.value,
  };
  renderCard(data);
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

Array.from(document.forms).forEach((formElement) => {
  formElement.addEventListener('submit', handleSubmitForms);
});
