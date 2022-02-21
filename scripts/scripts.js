let popup = document.querySelector('.popup')
let editButton = document.querySelector('.profile__edit-button')
let closeButton = document.querySelector('.popup__close-button')

editButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)

function togglePopup() {
  popup.classList.toggle('popup_opened')

  // if (popup.classList.contains('popup_opened')) {
  //   popup.classList.toggle('popup_opened')
  // } else {
  //   popup.classList.toggle('popup_opened')
  // }

}

