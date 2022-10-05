export const dataValidator = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

export const elementsListSelector = '.elements';

export const ESCAPE = 'Escape';

export const popupProfileOpenButton = document.querySelector(
  '.profile__info-button'
);

export const formProfile = document.querySelector('.popup__form_type_profile');

export const formAdd = document.querySelector('.popup__form_type_add');

export const formChangeProfile = document.querySelector(
  '.popup__form_type_update'
);

export const popupAddPhotoOpenButton =
  document.querySelector('.profile__button');

export const title = document.querySelector('.profile__title');
export const subtitle = document.querySelector('.profile__subtitle');
export const avatar = document.querySelector('.profile__avatar');
export const editAvatar = document.querySelector('.profile__edit');

export const API_CONFIG = {
  baseURL: 'https://api.mesto.nargisi.nomoredomains.icu',
  // headers: {
  //   authorization: '413ddd3a-fff9-444b-99b1-64e1cf71ff3f',
  //   'Content-Type': 'application/json',
  // },
};
