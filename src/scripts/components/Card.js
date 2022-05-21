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
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._enlargeButton = this._element.querySelector('.place__enlarge-button');

    const cardTitle = this._element.querySelector('.place__title');
    const cardImage = this._element.querySelector('.place__image');
    const cardLikes = this._element.querySelector('.place__like-counter');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;
    cardLikes.textContent = this._likes;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._enlargeButton.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIconClick();
    });
  }
}
