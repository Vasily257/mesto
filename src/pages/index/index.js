import './index.css';

import {
  buttonForEditingProfile,
  buttonForAddingCard,
  buttonSubmitPopupEditing,
  buttonSubmitPopupAdding,
  formOfAddingPopup,
  cardsSelector,
} from '../../scripts/utils/constants.js';
import { initialCards } from '../../scripts/utils/initialCards.js';

import Section from '../../scripts/components/Section.js';
import Card from '../../scripts/components/Card.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import FormValidator from '../../scripts/components/FormValidator.js';
import UserInfo from '../../scripts/components/UserInfo.js';

// Render initial cards

const defaultCardList = new Section(
  {
    items: initialCards.reverse(),
    render: (item) => {
      const card = new Card(item, '.place-template', () => {
        const popupEnlarging = new PopupWithImage(item, 'popup_type_enlarge');
        popupEnlarging.open();
      });

      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    },
  },
  cardsSelector
);

defaultCardList.renderItems();

// Create the user info control object

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });

// Add listeners of opening popups with the form

function handleButtonForEditingProfile() {
  userInfo.getUserInfo();

  validatorEditForm.initialEnableButton(
    buttonSubmitPopupEditing,
    'popup__submit-button_disabled',
    popupEditing
  );

  popupEditing.open();
}

function handleButtonForAddingCard() {
  formOfAddingPopup.reset();

  validatorAddForm.initialDisableButton(
    buttonSubmitPopupAdding,
    'popup__submit-button_disabled',
    popupAdding
  );

  popupAdding.open();
}

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);
buttonForAddingCard.addEventListener('click', handleButtonForAddingCard);

// Create popups with the form

const popupEditing = new PopupWithForm('.popup_type_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues);
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

// Start form validation

const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

const validatorEditForm = new FormValidator(config, popupEditing.getPopupForm());
const validatorAddForm = new FormValidator(config, popupAdding.getPopupForm());

validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
