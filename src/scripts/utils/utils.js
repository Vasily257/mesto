// Functions for closing and opening popups

function handleClosePopupEscKey(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closePopup(popup) {
  document.removeEventListener('keydown', handleClosePopupEscKey);
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  document.addEventListener('keydown', handleClosePopupEscKey);
  popup.classList.add('popup_opened');
}

export { openPopup, closePopup };
