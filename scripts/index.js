const content = document.querySelector('.content');
const contentButtons = content.querySelectorAll('button:not([disabled])');

const nameDisplay = document.querySelector('.profile__name');
const jobDisplay = document.querySelector('.profile__activity');
const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_activity');
const saveButton = document.querySelector('.popup__save-button');
const closeButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
  nameInput.focus();
  useTab(-1); //disable using a tab key outside popup
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
    closePopup();
  }
}

function closePopup() {
  popup.classList.toggle('popup_opened');
  useTab(1); //enable using a tab key
}

function useTab(index) {
  for (let i = 0; i < contentButtons.length; i++) {
    contentButtons[i].setAttribute('tabindex', index);
  }
}