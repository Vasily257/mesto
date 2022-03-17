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

// Listeners for opening and closing popups

document.addEventListener('click', function (event) {
  switch (event.target) {
    case buttonForAddingCard:
      openPopup(popupForAddingCard);
      break;
    case buttonForEditingProfile:
      openPopup(popupForEditingProfile);
      break;
    case buttonToCloseEditingPopup:
    case popupForEditingProfile:
      closePopup(popupForEditingProfile);
      break;
    case buttonToCloseAddingPopup:
    case popupForAddingCard:
      closePopup(popupForAddingCard);
      break;
    case buttonToCloseEnlargingPopup:
    case popupForEnlargingCard:
      closePopup(popupForEnlargingCard);
      break;
  }
});

// Listeners for closing a popup using the esc key

document.addEventListener('keydown', function (event) {
  const openPopup = document.querySelector('.popup_opened');
  if (event.code === 'Escape') {
    closePopup(openPopup);
  }
});

// Listeners for accepting the data of the popup form

formElementOfEditPopup.addEventListener('submit', editFormSubmitHandler);
formElementOfAddPopup.addEventListener('submit', addFormSubmitHandler);

// Handle popup form data

function editFormSubmitHandler(event) {
  event.preventDefault();
  if (isEmptyInput(nameInput, jobInput)) {
    alert('Пожалуйста, введите данные.');
  } else {
    loadTextFromInput(nameDisplay, nameInput);
    loadTextFromInput(jobDisplay, jobInput);
    closePopup(popupForEditingProfile);
  }
}

function addFormSubmitHandler(event) {
  event.preventDefault();
  if (isEmptyInput(placeNameInput, linkInput)) {
    alert('Пожалуйста, введите данные.');
  } else {
    const data = {
      name: placeNameInput.value,
      link: linkInput.value,
    };
    renderCard(data);
    closePopup(popupForAddingCard);
  }
}

// Open popup

function openPopup(popup) {
  togglePopup(popup);
  useTab(-1); //enable the tab key only in the popup

  switch (popup) {
    case popupForEditingProfile:
      loadTextFromDisplay(nameInput, nameDisplay);
      loadTextFromDisplay(jobInput, jobDisplay);
      nameInput.focus();
    case popupForAddingCard:
      placeNameInput.value = '';
      linkInput.value = '';
      placeNameInput.focus();
  }
}

// Close popup

function closePopup(popup) {
  togglePopup(popup);
  useTab(1); //enable tab key in the page
}

// Toggle popup

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Display text in the input

function loadTextFromDisplay(input, display) {
  input.value = display.textContent;
}

// Update text in the profile

function loadTextFromInput(display, input) {
  display.textContent = input.value;
}

// Check input

function isEmptyInput(...arrayInput) {
  return arrayInput.some((input) => {
    return !input.value || input.value.trim() === '';
  });
}

// Manage tab key

function useTab(index) {
  for (let i = 0; i < contentButtons.length; i++) {
    contentButtons[i].setAttribute('tabindex', index);
  }
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

  cardElement.addEventListener('click', (event) => {
    switch (event.target) {
      case buttonToLike:
        event.target.classList.toggle('places__like-button_active');
        break;
      case buttonToDelete:
        event.target.parentElement.remove();
        break;
      case buttonToEnlarge:
        openPopup(popupForEnlargingCard);
        popupImageCaption.textContent = cardTitle.textContent;
        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        break;
    }
  });

  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}

(function initialRenderCards() {
  initialCards.reverse().forEach((item) => {
    renderCard(item);
  });
})();

// Buttons where the tab-index will change

const contentButtons = content.querySelectorAll('button:not([disabled])');

// Буду очень рад советам из раздела «Можно лучше», чтобы понять, какие есть пути оптимизации кода))
