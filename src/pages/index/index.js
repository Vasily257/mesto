import './index.css';

import {
  buttonForEditingProfile,
  buttonForAddingCard,
  cardsSelector,
  config,
  formValidators,
  formList,
  initialCards,
} from '../../scripts/utils/constants.js';

import Section from '../../scripts/components/Section.js';
import Card from '../../scripts/components/Card.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';

// Create popup with the image

const popupEnlarging = new PopupWithImage('.popup_type_enlarge');
popupEnlarging.setEventListeners();

// Create card

// Заметка для ревьюера
// Я смог убрать функцию createCard, но как-то криво:
// у меня пара "items: initialCards.reverse()" оказалась невостребована))
// Если у меня получится исправить все остальные косяки, и останется время,
// то попробую ещё раз разобраться в вашем совете)

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
