import './index.css';

import Section from '../../scripts/components/Section.js';
import Card from '../../scripts/components/Card.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../../scripts/components/PopupWithConfirmation.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';
import Api from '../../scripts/components/Api.js';

import { getSubmitInitialText, changeSubmitText } from '../../scripts/utils/utils.js';

import {
  buttonForEditingProfile,
  buttonForAddingCard,
  buttonForUpdatingAvatar,
  cardsSelector,
  config,
  formValidators,
  formList,
  saveText,
  deleteText,
} from '../../scripts/utils/constants.js';

// Sync

// Create popup with the image

const popupEnlarging = new PopupWithImage('.popup_type_enlarge');
popupEnlarging.setEventListeners();

// Create popup with the submit

const popupSubmiting = new PopupWithConfirmation('.popup_type_submit');
popupSubmiting.setEventListeners();

// Create the user info control object

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__photo',
});

// Configure Api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'b6bde9be-8674-4eca-8179-302e0a4e2b6f',
    'Content-Type': 'application/json',
  },
});

// Asynch

// Get initial data from the server

api
  .getInitialData()
  .then((initialData) => {
    const [userData, initialCardsData] = initialData;

    // Set user info

    userInfo.setUserInfo(userData);

    // Function for checking the card for likes

    function checkLikeCard(item) {
      return item.likes.some((like) => like._id === userData._id);
    }

    // Function for creating a card

    function createCard(item) {
      const cardElement = new Card(
        {
          data: item,
          handleCardClick: () => {
            popupEnlarging.open(item);
          },
          handleLikeClick: () => {
            // Function for updating counter after changing the like

            function update??ounter(cardData) {
              cardElement.update??ounter(cardData.likes.length);
              item.likes = cardData.likes;
            }

            // Delete a like, if there is one, otherwise put the like

            if (checkLikeCard(item)) {
              api
                .deleteLike(item._id)
                .then((cardData) => {
                  cardElement.deleteLike();
                  update??ounter(cardData);
                })
                .catch((error) => console.log(`????????????: ${error}`));
            } else {
              api
                .putLike(item._id)
                .then((cardData) => {
                  cardElement.putLike();
                  update??ounter(cardData);
                })
                .catch((error) => console.log(`????????????: ${error}`));
            }
          },
          handleDeleteButtonClick: () => {
            popupSubmiting.setHandler(() => {
              // Manage submit button text

              const initialText = getSubmitInitialText(popupSubmiting);
              changeSubmitText(true, popupSubmiting, initialText, deleteText);

              api
                .deleteCard(item._id)
                .then(() => {
                  cardElement.deleteCard();
                  popupSubmiting.close();
                })
                .catch((error) => console.log(`????????????: ${error}`))
                .finally(() => {
                  changeSubmitText(false, popupSubmiting, initialText, deleteText);
                });
            });

            popupSubmiting.open();
          },
        },
        '.place-template'
      );

      return cardElement;
    }

    // Render initial cards

    const cardList = new Section(
      {
        items: initialCardsData.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          if (a.createdAt < b.createdAt) {
            return -1;
          }

          return 0;
        }),
        render: (item) => {
          // check a card owner and user's like

          const isNotUserCard = item.owner._id === userData._id ? false : true;
          const isLikedByUser = checkLikeCard(item);

          const cardElement = createCard(item).generateCard({ isNotUserCard, isLikedByUser });
          cardList.addItem(cardElement);
        },
      },
      cardsSelector
    );
    cardList.renderItems();

    return { userData, initialCardsData, cardList };
  })

  .then((dataObject) => {
    // Function to start validation

    function enableValidation(config) {
      formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;

        validator.enableValidation();
      });
    }

    // Start form validation

    enableValidation(config);

    return dataObject;
  })

  .then((dataObject) => {
    // Create a popup for editing

    const popupEditing = new PopupWithForm('.popup_type_edit', (inputValues) => {
      // Manage submit button text

      const initialText = getSubmitInitialText(popupEditing);
      changeSubmitText(true, popupEditing, initialText, saveText);

      // Edit user info

      api
        .editUserInfo(inputValues)
        .then((userData) => {
          userInfo.setUserInfo(userData);
          popupEditing.close();
        })
        .catch((error) => console.log(`????????????: ${error}`))
        .finally(() => {
          changeSubmitText(false, popupEditing, initialText, saveText);
        });
    });

    popupEditing.setEventListeners();

    // Add listeners to open the popup for editing

    function handleEditButton() {
      popupEditing.setInputValues(userInfo.getUserInfo());
      formValidators['edit'].resetValidation();
      popupEditing.open();
    }

    buttonForEditingProfile.addEventListener('click', handleEditButton);

    return dataObject;
  })

  .then((dataObject) => {
    // Create a popup for adding

    const popupAdding = new PopupWithForm('.popup_type_add', (inputValues) => {
      // Manage submit button text

      const initialText = getSubmitInitialText(popupAdding);
      changeSubmitText(true, popupAdding, initialText, saveText);

      // Get data from popup adding

      const data = {
        name: inputValues.place,
        link: inputValues.link,
      };

      // Add a new card

      api
        .addNewCard(data)
        .then((data) => {
          dataObject.cardList.renderOneItem(data);
          popupAdding.close();
        })
        .catch((error) => console.log(`????????????: ${error}`))
        .finally(() => {
          changeSubmitText(false, popupAdding, initialText, saveText);
        });
    });

    popupAdding.setEventListeners();

    // Add listeners to open the popup for adding

    function handleButtonForAddingCard() {
      formValidators['add'].resetValidation();
      popupAdding.open();
    }

    buttonForAddingCard.addEventListener('click', handleButtonForAddingCard);

    return dataObject;
  })

  .then((dataObject) => {
    // Create a popup to update avatar

    const popupUpdatingAvatar = new PopupWithForm('.popup_type_update-avatar', (inputValues) => {
      // Manage submit button text

      const initialText = getSubmitInitialText(popupUpdatingAvatar);
      changeSubmitText(true, popupUpdatingAvatar, initialText, saveText);

      const data = {
        avatar: inputValues['avatar-link'],
      };

      // Update avatar

      api
        .updateAvatar(data)
        .then((userData) => {
          userInfo.setUserInfo(userData);
          popupUpdatingAvatar.close();
        })
        .catch((error) => console.log(`????????????: ${error}`))
        .finally(() => {
          changeSubmitText(false, popupUpdatingAvatar, initialText, saveText);
        });
    });

    popupUpdatingAvatar.setEventListeners();

    // Add listeners to open the popup for adding

    function handleButtonForUpdatingAvatar() {
      formValidators['update-avatar'].resetValidation();
      popupUpdatingAvatar.open();
    }

    buttonForUpdatingAvatar.addEventListener('click', handleButtonForUpdatingAvatar);

    return dataObject;
  })

  .catch((error) => console.log(`????????????: ${error}`));
