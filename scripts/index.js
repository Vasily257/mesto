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
const jobProfile = profile.querySelector('.profile__activity');
const buttonForEditingProfile = profile.querySelector('.profile__edit-button');
const buttonForAddingCard = profile.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const popupForEditingProfile = document.querySelector('.popup_type_edit');
const formElementOfEditPopup = document.forms.edit;
const namePopup = formElementOfEditPopup.name;
const jobPopup = formElementOfEditPopup.activity;

const popupForAddingCard = document.querySelector('.popup_type_add');
const formElementOfAddPopup = document.forms.add;
const placePopup = formElementOfAddPopup.place;
const linkPopup = formElementOfAddPopup.link;

const popupForEnlargingCard = document.querySelector('.popup_type_enlarge');
const popupImage = popupForEnlargingCard.querySelector('.popup__image');
const popupImageContainer = popupForEnlargingCard.querySelector('.popup__image-container');
const popupImageCaption = popupForEnlargingCard.querySelector('.popup__image-caption');

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
  openPopup(popupForEditingProfile);
}

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);

function handleButtonForAddingCard() {
  formElementOfAddPopup.reset();
  openPopup(popupForAddingCard);
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

// Listeners for accepting the data of the popup form

function handleFormElementOfEditPopup(event) {
  event.preventDefault();
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  closePopup(popupForEditingProfile);
}

formElementOfEditPopup.addEventListener('submit', handleFormElementOfEditPopup);

function handleFormElementOfAddPopup(event) {
  event.preventDefault();
  const data = {
    name: placePopup.value,
    link: linkPopup.value,
  };
  renderCard(data);
  closePopup(popupForAddingCard);
}

formElementOfAddPopup.addEventListener('submit', handleFormElementOfAddPopup);

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
    openPopup(popupForEnlargingCard);
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
