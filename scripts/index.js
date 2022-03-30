const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

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
const buttonSubmitPopupEditing = popupEditing.querySelector('.popup__save-button');

const popupAdding = document.querySelector('.popup_type_add');
const formOfAddingPopup = document.forms.add;
const placePopup = formOfAddingPopup.elements.place;
const linkPopup = formOfAddingPopup.elements.link;
const buttonSubmitPopupAdding = popupAdding.querySelector('.popup__save-button');

const popupEnlarging = document.querySelector('.popup_type_enlarge');
const popupImage = popupEnlarging.querySelector('.popup__image');
const popupImageContainer = popupEnlarging.querySelector('.popup__image-container');
const popupImageCaption = popupEnlarging.querySelector('.popup__image-caption');

// Popups

// Functions for opening and closing popups

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Listeners for opening a popup whith click to button

function handleButtonForEditingProfile() {
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;
  openPopup(popupEditing);
}

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);

function handleButtonForAddingCard() {
  formOfAddingPopup.reset();
  openPopup(popupAdding);
}

buttonForAddingCard.addEventListener('click', handleButtonForAddingCard);

// Listeners for closing a popups whith click

function handleClosePopup(event) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains('popup__close-button')
  ) {
    closePopup(event.target.closest('.popup'));
  }
}

popups.forEach((popup) => {
  popup.addEventListener('click', handleClosePopup);
});

// Popup forms

// Function for switching the save buttons

function setSubmitButtonState(isFormValid, button) {
  if (isFormValid) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__save-button_disabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('popup__save-button_disabled');
  }
}

// Functions for showing and hiding errors

const namePopupError = formOfEditingPopup.querySelector(`.${namePopup.id}-error`);

function showInputError(input, errorMessage) {
  input.classList.add('popup__input_type_error');
  namePopupError.textContent = errorMessage;
  namePopupError.classList.add('popup__input-error_active');
}

function hideInputError(input) {
  input.classList.remove('popup__input_type_error');
  namePopupError.classList.remove('popup__input-error_active');
  namePopupError.textContent = '';
}

function isValid() {
  if (!namePopup.validity.valid) {
    showInputError(namePopup, namePopup.validationMessage);
  } else {
    hideInputError(namePopup);
  }
}

popupEditing.addEventListener('submit', (event) => {
  event.preventDefault();
});

namePopup.addEventListener('input', isValid);

// Заготовка универсальной функции

// function isValid(input) {
//   if (!input.validity.valid) {
//     showInputError(input);
//   } else {
//     hideInputError(input);
//   }
// }

// Listeners for accepting the data of the popup form

function handleInputOfEditingForm(event) {
  const isValid = namePopup.value.length > 0 && jobPopup.value.length > 0;
  setSubmitButtonState(isValid, buttonSubmitPopupEditing);
}

function handleSubmitOfEditingForm(event) {
  event.preventDefault();
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  closePopup(popupEditing);
}

formOfEditingPopup.addEventListener('input', handleInputOfEditingForm);
formOfEditingPopup.addEventListener('submit', handleSubmitOfEditingForm);

function handleInputOfAddingForm(event) {
  const isValid = placePopup.value.length > 0 && linkPopup.value.length > 0;
  setSubmitButtonState(isValid, buttonSubmitPopupAdding);
}

function handleSubmitOfAddingForm(event) {
  event.preventDefault();
  const data = {
    name: placePopup.value,
    link: linkPopup.value,
  };
  renderCard(data);
  setSubmitButtonState(false, buttonSubmitPopupAdding);
  closePopup(popupAdding);
}

formOfAddingPopup.addEventListener('input', handleInputOfAddingForm);
formOfAddingPopup.addEventListener('submit', handleSubmitOfAddingForm);

// Cards (places)

function createCard(data) {
  const cardElement = document
    .querySelector('.places-template')
    .content.firstElementChild.cloneNode(true);

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
