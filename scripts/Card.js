export default class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
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
    this._element.querySelector('.places__like-button').addEventListener('click', () => {
      this._handleButtonToLike();
    });

    this._element.querySelector('.places__delete-button').addEventListener('click', () => {
      this._handleButtonToDelete();
    });

    // this._element.querySelector('.places__enlarge-button').addEventListener('click', () => {
    //   this._handleButtonToEnlarge;
    // });
  }

  _handleButtonToLike() {
    this._element
      .querySelector('.places__like-button')
      .classList.toggle('places__like-button_active');
  }

  _handleButtonToDelete() {
    this._element.querySelector('.places__delete-button').closest('.places__item').remove();
  }

  // _handleButtonToEnlarge() {
  //   popupImageCaption.textContent = this._title;
  //   popupImage.src = this._link;
  //   popupImage.alt = this._alt;
  //   openPopup(popupEnlarging);
  // }
}
