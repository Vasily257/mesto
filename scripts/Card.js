import { openPopup, popupEnlarging, popupImage, popupImageCaption } from './utils.js';

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._alt = this._title;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._element.querySelector('.place__title');
    const cardImage = this._element.querySelector('.place__image');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    return this._element;
  }

  _setEventListeners() {
    this._getLikeButton().addEventListener('click', () => {
      this._handleButtonToLike();
    });

    this._getDeleteButton().addEventListener('click', () => {
      this._handleButtonToDelete();
    });

    this._getEnlargeButton().addEventListener('click', () => {
      this._handleButtonToEnlarge();
    });
  }

  _handleButtonToLike() {
    this._getLikeButton().classList.toggle('place__like-button_active');
  }

  _handleButtonToDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleButtonToEnlarge() {
    popupImageCaption.textContent = this._title;
    popupImage.src = this._link;
    popupImage.alt = this._alt;

    openPopup(popupEnlarging);
  }

  _getLikeButton() {
    if (!this._likeButton) {
      this._likeButton = this._element.querySelector('.place__like-button');
    }

    return this._likeButton;
  }

  _getDeleteButton() {
    if (!this._deleteButton) {
      this._deleteButton = this._element.querySelector('.place__delete-button');
    }

    return this._deleteButton;
  }

  _getEnlargeButton() {
    if (!this._enlargeButton) {
      this._enlargeButton = this._element.querySelector('.place__enlarge-button');
    }

    return this._enlargeButton;
  }
}
