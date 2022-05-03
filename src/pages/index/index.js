import './index.css';

import {
  nameProfile,
  jobProfile,
  buttonForEditingProfile,
  buttonForAddingCard,
  cardsSelector,
  popups,
  // popupEditing,
  formOfEditingPopup,
  namePopup,
  jobPopup,
  buttonSubmitPopupEditing,
  // popupAdding,
  formOfAddingPopup,
  placePopup,
  linkPopup,
  buttonSubmitPopupAdding,
} from '../../scripts/utils/constants.js';
import { initialCards } from '../../scripts/utils/initialCards.js';
import { openPopup, closePopup } from '../../scripts/utils/utils.js';

import Section from '../../scripts/components/Section.js';
import Card from '../../scripts/components/Card.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import FormValidator from '../../scripts/components/FormValidator.js';

// Start form validation

const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

const validatorEditForm = new FormValidator(config, popupEditing);
const validatorAddForm = new FormValidator(config, popupAdding);

validatorEditForm.enableValidation();
validatorAddForm.enableValidation();

// Cards (rewrite / delete old)

const defaultCardList = new Section(
  {
    items: initialCards.reverse(),
    render: (item) => {
      const card = new Card(item, '.place-template');
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    },
  },
  cardsSelector
);

defaultCardList.renderItems();

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

// Listener for closing a popups with click (rewrite / don't delete old)

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

// Add a submit listener for forms

const popupEditing = new PopupWithForm('.popup_type_edit', (inputValues) => {
  nameProfile.textContent = inputValues.name;
  jobProfile.textContent = inputValues.job;
  close();
});

const popupAdding = new PopupWithForm('.popup_type_add', (inputValues) => {
  const data = {
    name: inputValues.place,
    link: inputValues.link,
  };

  const createdCardsList = new Section(
    {
      items: [data],
      render: (item) => {
        const card = new Card(item, '.place-template');
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
      },
    },
    cardsSelector
  );
  createdCardsList.renderItems();

  close();
});

popupEditing.setEventListeners();
popupAdding.setEventListeners();
