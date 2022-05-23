export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteButtonClick }, cardSelector) {
    this._data = data;
    this._title = this._data.name;
    this._link = this._data.link;
    this._likes = this._data.likes.length;
    this._id = this._data._id;
    this._ownerId = this._data.owner._id;

    this._alt = this._title;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _checkCard(isNotUserCard) {
    if (isNotUserCard) {
      this._deleteButton.remove();
    }
  }

  _checkLike(isLikedByUser) {
    if (isLikedByUser) {
      this.putLike();
    }
  }

  generateCard(cheсks) {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._enlargeButton = this._element.querySelector('.place__enlarge-button');
    this._cardLikes = this._element.querySelector('.place__like-counter');

    const cardTitle = this._element.querySelector('.place__title');
    const cardImage = this._element.querySelector('.place__image');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    this._cardLikes.textContent = this._likes;

    this._setEventListeners();

    this._checkCard(cheсks.isNotUserCard);
    this._checkLike(cheсks.isLikedByUser);

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      });
    }

    this._enlargeButton.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  putLike() {
    this._likeButton.classList.add('place__like-button_active');
  }

  deleteLike() {
    this._likeButton.classList.remove('place__like-button_active');
  }

  updateСounter(likes) {
    this._cardLikes.textContent = likes;
  }
}
