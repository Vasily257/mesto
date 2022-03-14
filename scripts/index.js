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
  togglePopup();
  loadTextFromDisplay(nameInput, nameDisplay);
  loadTextFromDisplay(jobInput, jobDisplay);

  nameInput.focus();
  useTab(-1); //enable the tab key only in the popup
}

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function loadTextFromDisplay(input, display) {
  input.value = display.textContent;
}

function formSubmitHandler(event) {
  event.preventDefault();
  if (isEmptyInput(nameInput, jobInput)) {
    alert('Пожалуйста, введите данные.');
  } else {
    loadTextFromInput(nameDisplay, nameInput);
    loadTextFromInput(jobDisplay, jobInput);
    closePopup();
  }
}

function loadTextFromInput(display, input) {
  display.textContent = input.value;
}

function isEmptyInput(...arrayInput) {
  return arrayInput.some((input) => {
    return !input.value || input.value.trim() === '';
  });
}

function closePopup() {
  togglePopup();
  useTab(1); //enable tab key in the page
}

function useTab(index) {
  for (let i = 0; i < contentButtons.length; i++) {
    contentButtons[i].setAttribute('tabindex', index);
  }
}
