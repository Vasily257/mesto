export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._openPopupSelector = 'popup_opened';
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });

    this._popup.classList.add(this._openPopupSelector);
  }

  close() {
    document.removeEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
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
