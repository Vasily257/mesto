export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._data = data;
    this._title = this._data.name;
    this._link = this._data.link;
    this._likes = this._data.likes.length;
    this._id = this._data._id;

    this._alt = this._title;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this.element = this._getTemplate();
    this.likeButton = this.element.querySelector('.place__like-button');
    this.deleteButton = this.element.querySelector('.place__delete-button');
    this.enlargeButton = this.element.querySelector('.place__enlarge-button');

    const cardTitle = this.element.querySelector('.place__title');
    const cardImage = this.element.querySelector('.place__image');
    const cardLikes = this.element.querySelector('.place__like-counter');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;
    cardLikes.textContent = this._likes;

    this._setEventListeners();

    return this.element;
  }

  _setEventListeners() {
    this.enlargeButton.addEventListener('click', () => {
      this._handleCardClick();
    });

    this.likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this.deleteButton.addEventListener('click', () => {
      this._handleDeleteIconClick();
    });
  }
}
