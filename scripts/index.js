const content = document.querySelector('.content');
const contentButtons = content.querySelectorAll('button:not([disabled])');

const profile = document.querySelector('.profile');
const nameDisplay = profile.querySelector('.profile__name');
const jobDisplay = profile.querySelector('.profile__activity');
const editButton = profile.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_activity');
const saveButton = popup.querySelector('.popup__save-button');
const closeButton = popup.querySelector('.popup__close-button');

editButton.addEventListener('click', openPopup);

popup.addEventListener('click', function (event) {
  switch (event.target) {
    case event.currentTarget:
      closePopup();
      break;
    case closeButton:
      closePopup();
      break;
  }
});

popup.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    closePopup();
  }
});

formElement.addEventListener('submit', formSubmitHandler);

function openPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
  nameInput.focus();
  useTab(-1); //enable the tab only in the popup
}

function formSubmitHandler(event) {
  event.preventDefault();
  if (isEmptyInput(nameInput, jobInput)) {
    alert('Пожалуйста, введите данные.');
  } else {
    nameDisplay.textContent = nameInput.value;
    jobDisplay.textContent = jobInput.value;
    closePopup();
  }
}

function isEmptyInput(...arrayInput) {
  arrayInput.every((input) => {
    return !input.value || input.value.trim() === '';
  });
}




function closePopup() {
  popup.classList.toggle('popup_opened');
  useTab(1); //enable tab key in the page
}

function useTab(index) {
  for (let i = 0; i < contentButtons.length; i++) {
    contentButtons[i].setAttribute('tabindex', index);
  }
}
