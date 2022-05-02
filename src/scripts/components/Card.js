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
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._enlargeButton = this._element.querySelector('.place__enlarge-button');

    const cardTitle = this._element.querySelector('.place__title');
    const cardImage = this._element.querySelector('.place__image');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleButtonToLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleButtonToDelete();
    });

    this._enlargeButton.addEventListener('click', () => {
      this._handleButtonToEnlarge();
    });
  }

  _handleButtonToLike() {
    this._likeButton.classList.toggle('place__like-button_active');
  }

  _handleButtonToDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleButtonToEnlarge() {}
}
