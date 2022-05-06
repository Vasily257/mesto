export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._openPopupSelector = 'popup_opened';
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._openPopupSelector);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._openPopupSelector);
  }

  _handleClickClose(event) {
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains('popup__close-button')
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      this._handleClickClose(event);
    });
  }
}
