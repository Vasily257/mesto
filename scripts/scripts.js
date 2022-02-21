let nameDisplay = document.querySelector('.profile__name');
let jobDisplay = document.querySelector('.profile__activity');
let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelectorAll('.popup__input')[0];
let jobInput = document.querySelectorAll('.popup__input')[1];
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (
    !nameInput.value ||
    !jobInput.value ||
    nameInput.value.trim() === '' ||
    jobInput.value.trim() === ''
  ) {
    alert('Пожалуйста, введите данные.');
  } else {
    nameDisplay.textContent = nameInput.value;
    jobDisplay.textContent = jobInput.value;
    popup.classList.toggle('popup_opened');
  }
}

function closePopup() {
  popup.classList.toggle('popup_opened');
}
