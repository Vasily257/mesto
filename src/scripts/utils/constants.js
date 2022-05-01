export const profile = document.querySelector('.profile');
export const nameProfile = profile.querySelector('.profile__name');
export const jobProfile = profile.querySelector('.profile__job');
export const buttonForEditingProfile = profile.querySelector('.profile__edit-button');
export const buttonForAddingCard = profile.querySelector('.profile__add-button');

export const cardsContainer = document.querySelector('.places__list');
export const popups = document.querySelectorAll('.popup');
export const forms = document.forms;

export const popupEditing = document.querySelector('.popup_type_edit');
export const formOfEditingPopup = forms.edit;
export const namePopup = formOfEditingPopup.elements.name;
export const jobPopup = formOfEditingPopup.elements.job;
export const buttonSubmitPopupEditing = popupEditing.querySelector('.popup__submit-button');

export const popupAdding = document.querySelector('.popup_type_add');
export const formOfAddingPopup = forms.add;
export const placePopup = formOfAddingPopup.elements.place;
export const linkPopup = formOfAddingPopup.elements.link;
export const buttonSubmitPopupAdding = popupAdding.querySelector('.popup__submit-button');
