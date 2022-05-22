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
import PopupWithSubmit from '../../scripts/components/PopupWithSubmit';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';
import Api from '../../scripts/components/Api.js';

// Synchronous code

// Create popup with the image

const popupEnlarging = new PopupWithImage('.popup_type_enlarge');
popupEnlarging.setEventListeners();

// Create popup with the submit

const popupSubmiting = new PopupWithSubmit('.popup_type_submit', () => {});
popupSubmiting.setEventListeners();

// Create the user info control object

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__photo',
});

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

// Function to start validation

function enableValidation(config) {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  });
}

// Asynchronous code

// Configure Api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'b6bde9be-8674-4eca-8179-302e0a4e2b6f',
    'Content-Type': 'application/json',
  },
});

// Get user info and render initial cards

api
  .getInitialData()
  .then((initialData) => {
    const [userData, initialCardsDate] = initialData;

    userInfo.setUserInfo(userData);

    function createCard(item) {
      const cardElement = new Card(
        {
          data: item,
          handleCardClick: () => {
            popupEnlarging.open(item);
          },
          handleLikeClick: () => {
            cardElement.toLike();
          },
          handleDeleteIconClick: () => {
            //TODO: Отправить запрос на удаление карточки (промис)
            popupSubmiting.open();
            popupSubmiting.changeHandler(cardElement.toDelete());
          },
        },
        '.place-template'
      );

      return cardElement;
    }

    const cardList = new Section(
      {
        items: initialCardsDate,
        render: (item) => {
          const cardElement = createCard(item).generateCard();
          cardList.addItem(cardElement);
        },
      },
      cardsSelector
    );
    cardList.renderItems();

    return [userData, initialCardsDate];
  })
  .catch((error) => {
    console.log(error);
  });

// Create popups with the form

const popupEditing = new PopupWithForm('.popup_type_edit', (inputValues) => {
  api
    .editUserInfo(inputValues)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((error) => {
      console.log(error);
    });

  popupEditing.close();
});

const popupAdding = new PopupWithForm('.popup_type_add', (inputValues) => {
  const data = {
    name: inputValues.place,
    link: inputValues.link,
  };

  api
    .addNewCard(data)
    .then((cardData) => {
      // TODO: Исправить код, чтобы сразу отрисовывалась карточка (добавить связь с Api.js)
      cardList.renderOneItem({ name: cardData.name, link: cardData.link });
      popupAdding.close();
    })

    .catch((error) => {
      console.log(error);
    });
});

popupEditing.setEventListeners();
popupAdding.setEventListeners();

// Start form validation

enableValidation(config);
