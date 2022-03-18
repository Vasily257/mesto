const content = document.querySelector('.content');

const profile = document.querySelector('.profile');
const nameDisplay = profile.querySelector('.profile__name');
const jobDisplay = profile.querySelector('.profile__activity');
const buttonForEditingProfile = profile.querySelector('.profile__edit-button');
const buttonForAddingCard = profile.querySelector('.profile__add-button');

const cardsContainer = document.querySelector('.places__list');

const popupForEditingProfile = document.querySelector('.popup_type_edit');
const formElementOfEditPopup = popupForEditingProfile.querySelector('.popup__form_type_edit');
const nameInput = popupForEditingProfile.querySelector('.popup__input_type_name');
const jobInput = popupForEditingProfile.querySelector('.popup__input_type_activity');
const buttonToCloseEditingPopup = popupForEditingProfile.querySelector(
  '.popup__close-button_type_edit'
);

const popupForAddingCard = document.querySelector('.popup_type_add');
const formElementOfAddPopup = popupForAddingCard.querySelector('.popup__form_type_add');
const placeNameInput = popupForAddingCard.querySelector('.popup__input_type_place-name');
const linkInput = popupForAddingCard.querySelector('.popup__input_type_link');
const buttonToCloseAddingPopup = popupForAddingCard.querySelector('.popup__close-button_type_add');

const popupForEnlargingCard = document.querySelector('.popup_type_enlarge');
const popupImage = popupForEnlargingCard.querySelector('.popup__image');
const popupImageContainer = popupForEnlargingCard.querySelector('.popup__image-container');
const popupImageCaption = popupForEnlargingCard.querySelector('.popup__image-caption');
const buttonToCloseEnlargingPopup = popupForEnlargingCard.querySelector(
  '.popup__close-button_type_enlarge'
);

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

// Popups

// Listeners for opening a popup whith click to button

buttonForEditingProfile.addEventListener('click', () => {
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
  openPopup(popupForEditingProfile);
});

buttonForAddingCard.addEventListener('click', () => {
  placeNameInput.value = '';
  linkInput.value = '';
  openPopup(popupForAddingCard);
});

// Listeners for closing a popups whith click to button

buttonToCloseEditingPopup.addEventListener('click', () => {
  closePopup(popupForEditingProfile);
});

buttonToCloseAddingPopup.addEventListener('click', () => {
  closePopup(popupForAddingCard);
});

buttonToCloseEnlargingPopup.addEventListener('click', () => {
  closePopup(popupForEnlargingCard);
});

// Listeners for closing a popups whith click to overlay

popupForEditingProfile.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupForEditingProfile);
  }
});

popupForAddingCard.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupForAddingCard);
  }
});

popupForEnlargingCard.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupForEnlargingCard);
  }
});

// Listeners for accepting the data of the popup form

formElementOfEditPopup.addEventListener('submit', editFormSubmitHandler);
formElementOfAddPopup.addEventListener('submit', addFormSubmitHandler);

// Listeners for closing a popup using the esc key

// document.addEventListener('keydown', function (event) {
//   const openPopup = document.querySelector('.popup_opened');
//   if (event.code === 'Escape') {
//     closePopup(openPopup);
//   }
// });

// Handle popup form data

function editFormSubmitHandler(event) {
  event.preventDefault();
  nameDisplay.textContent = nameInput.value;
  jobDisplay.textContent = jobInput.value;
  closePopup(popupForEditingProfile);
}

function addFormSubmitHandler(event) {
  event.preventDefault();
  const data = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  renderCard(data);
  closePopup(popupForAddingCard);
}

// Open popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Close popup

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

  buttonToLike.addEventListener('click', () => {
    buttonToLike.classList.toggle('places__like-button_active');
  });

  buttonToDelete.addEventListener('click', () => {
    buttonToDelete.parentElement.remove();
  });

  buttonToEnlarge.addEventListener('click', () => {
    openPopup(popupForEnlargingCard);
    popupImageCaption.textContent = cardTitle.textContent;
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
  });

  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}

initialCards.reverse().forEach((item) => {
  renderCard(item);
});
