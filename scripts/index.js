const content = document.querySelector('.content');
const contentButtons = content.querySelectorAll('button:not([disabled])');

const profile = document.querySelector('.profile');
const nameDisplay = profile.querySelector('.profile__name');
const jobDisplay = profile.querySelector('.profile__activity');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const cards = document.querySelector('.places');
const cardsContainer = cards.querySelector('.places__list');

const editPopup = document.querySelector('.popup_type_edit');
const formElementOfEditPopup = editPopup.querySelector('.popup__form_type_edit');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_activity');
const saveButtonOfEditPopup = editPopup.querySelector('.popup__save-button_type_edit');
const closeButtonOfEditPopup = editPopup.querySelector('.popup__close-button_type_edit');

const addPopup = document.querySelector('.popup_type_add');
const formElementOfAddPopup = addPopup.querySelector('.popup__form_type_add');
const placeNameInput = addPopup.querySelector('.popup__input_type_place-name');
const linkInput = addPopup.querySelector('.popup__input_type_link');
const saveButtonOfAddPopup = addPopup.querySelector('.popup__save-button_type_add');
const closeButtonOfAddPopup = addPopup.querySelector('.popup__close-button_type_add');

const enlargePopup = document.querySelector('.popup_type_enlarge');
const popupImage = enlargePopup.querySelector('.popup__image');
const popupImageContainer = enlargePopup.querySelector('.popup__image-container');
const popupImageCaption = enlargePopup.querySelector('.popup__image-caption');
const closeButtonOfEnlargePopup = enlargePopup.querySelector('.popup__close-button_type_enlarge');

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

// Listeners for opening a popup with a click

profile.addEventListener('click', (event) => {
  switch (event.target) {
    case addButton:
      openPopup(addPopup);
      break;
    case editButton:
      openPopup(editPopup);
      break;
  }
});

// Listeners for closing a popup with a click

document.addEventListener('click', function (event) {
  switch (event.target) {
    case closeButtonOfEditPopup:
    case editPopup:
      closePopup(editPopup);
      break;
    case closeButtonOfAddPopup:
    case addPopup:
      closePopup(addPopup);
      break;
    case closeButtonOfEnlargePopup:
    case enlargePopup:
      closePopup(enlargePopup);
      break;
  }
});

// Listeners for closing a popup using the esc key

document.addEventListener('keydown', function (event) {
  if (event.code === 'Escape' && editPopup.classList.contains('popup_opened')) {
    closePopup(editPopup);
  } else if (event.code === 'Escape' && addPopup.classList.contains('popup_opened')) {
    closePopup(addPopup);
  } else if (event.code === 'Escape' && enlargePopup.classList.contains('popup_opened')) {
    closePopup(enlargePopup);
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
    closePopup(editPopup);
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
    closePopup(addPopup);
  }
}

// Open popup

function openPopup(popup) {
  togglePopup(popup);
  useTab(-1); //enable the tab key only in the popup

  switch (popup) {
    case editPopup:
      loadTextFromDisplay(nameInput, nameDisplay);
      loadTextFromDisplay(jobInput, jobDisplay);
      nameInput.focus();
    case addPopup:
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
  const likeButton = cardElement.querySelector('.places__like-button');
  const deleteButton = cardElement.querySelector('.places__delete-button');
  const cardImage = cardElement.querySelector('.places__image');
  const enlargeButton = cardElement.querySelector('.places__enlarge-button');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.addEventListener('click', (event) => {
    switch (event.target) {
      case likeButton:
        event.target.classList.toggle('places__like-button_active');
        break;
      case deleteButton:
        event.target.parentElement.remove();
        break;
      case enlargeButton:
        openPopup(enlargePopup);
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
