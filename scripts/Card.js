export default class Card {
  constructor(data) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.places-template')
      .content.querySelector('.places__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._element.querySelector('.places__title');
    const cardImage = this._element.querySelector('.places__image');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    return this._element;
  }

  _setEventListeners() {
    const buttonToLike = this._element.querySelector('.places__like-button');
    const buttonToDelete = this._element.querySelector('.places__delete-button');
    const buttonToEnlarge = this._element.querySelector('.places__enlarge-button');

    buttonToLike.addEventListener('click', () => {
      this._handleButtonToLike;
    });

    buttonToDelete.addEventListener('click', () => {
      this._handleButtonToDelete;
    });

    buttonToEnlarge.addEventListener('click', () => {
      this._handleButtonToEnlarge;
    });
  }

  _handleButtonToLike() {
    buttonToLike.classList.toggle('places__like-button_active');
  }

  _handleButtonToDelete() {
    buttonToDelete.closest('.places__item').remove();
  }

  _handleButtonToEnlarge() {
    popupImageCaption.textContent = this._title;
    popupImage.src = this._link;
    popupImage.alt = this._alt;
    openPopup(popupEnlarging);
  }
}
