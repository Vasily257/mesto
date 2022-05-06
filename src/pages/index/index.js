import './index.css';

import {
  buttonForEditingProfile,
  buttonForAddingCard,
  cardsSelector,
  config,
  initialCards,
} from '../../scripts/utils/constants.js';

import Section from '../../scripts/components/Section.js';
import Card from '../../scripts/components/Card.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';

// Create card

function createCard(item) {
  const cardElement = new Card(
    {
      data: item,
      handleCardClick: () => {
        const popupEnlarging = new PopupWithImage(item, '.popup_type_enlarge');
        popupEnlarging.open();
        popupEnlarging.setEventListeners();
      },
    },
    '.place-template'
  );

  return cardElement;
}

// Render initial cards

const cardList = new Section(
  {
    items: initialCards.reverse(),
    render: (item) => {
      const cardElement = createCard(item).generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsSelector
);

cardList.renderItems();

// Create the user info control object

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });

// Create popups with the form

const popupEditing = new PopupWithForm('.popup_type_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  popupEditing.close();
});

const popupAdding = new PopupWithForm('.popup_type_add', (inputValues) => {
  const data = {
    name: inputValues.place,
    link: inputValues.link,
  };

  cardList.renderOneItem(data);
  popupAdding.close();
});

popupEditing.setEventListeners();
popupAdding.setEventListeners();

// Start form validation

const validatorEditForm = new FormValidator(config, popupEditing.getPopupElement());
const validatorAddForm = new FormValidator(config, popupAdding.getPopupElement());

validatorEditForm.enableValidation();
validatorAddForm.enableValidation();

// Add listeners of opening popups with the form

function handleButtonForEditingProfile() {
  popupEditing.setInputValues(userInfo.getUserInfo());

  validatorEditForm.initialEnableButton(
    popupEditing.getSubmitButton(),
    config.inactiveButtonClass,
    popupEditing.getPopupElement()
  );

  popupEditing.open();
}

function handleButtonForAddingCard() {
  validatorAddForm.initialDisableButton(
    popupAdding.getSubmitButton(),
    config.inactiveButtonClass,
    popupAdding.getPopupElement()
  );

  popupAdding.open();
}

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);
buttonForAddingCard.addEventListener('click', handleButtonForAddingCard);
