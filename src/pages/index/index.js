import './index.css';

import {
  buttonForEditingProfile,
  buttonForAddingCard,
  cardsSelector,
  config,
  formValidators,
  formList,
} from '../../scripts/utils/constants.js';

import Section from '../../scripts/components/Section.js';
import Card from '../../scripts/components/Card.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';
import Api from '../../scripts/components/Api.js';

// Configure Api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'b6bde9be-8674-4eca-8179-302e0a4e2b6f',
    'Content-Type': 'application/json',
  },
});

// Create popup with the image

const popupEnlarging = new PopupWithImage('.popup_type_enlarge');
popupEnlarging.setEventListeners();

// Create card

function createCard(item) {
  const cardElement = new Card(
    {
      data: item,
      handleCardClick: () => {
        popupEnlarging.open(item);
      },
    },
    '.place-template'
  );

  return cardElement;
}

// Render initial cards

const apiInitialCards = api.getInitialCards();
apiInitialCards
  .then((data) => {
    const cardList = new Section(
      {
        items: data,
        render: (item) => {
          const cardElement = createCard(item).generateCard();
          cardList.addItem(cardElement);
        },
      },
      cardsSelector
    );

    cardList.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

// Create the user info control object

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about' });

// Get and set user info from server (Api)

const apiUserInfo = api.getUserInfo();
apiUserInfo.then(({ name, about }) => {
  userInfo.setUserInfo({ name, about });
});

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

function enableValidation(config) {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  });
}

enableValidation(config);

// Add listeners of opening popups with the form

function handleButtonForEditingProfile() {
  popupEditing.setInputValues(userInfo.getUserInfo());
  formValidators['edit'].resetValidation();
  popupEditing.open();
}

function handleButtonForAddingCard() {
  formValidators['add'].resetValidation();
  popupAdding.open();
}

buttonForEditingProfile.addEventListener('click', handleButtonForEditingProfile);
buttonForAddingCard.addEventListener('click', handleButtonForAddingCard);
