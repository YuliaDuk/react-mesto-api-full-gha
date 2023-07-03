export const options = {formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};
export const elementsContainer = document.querySelector('.elements');
export const popupEditOpenButton = document.querySelector('.profile__button');
export const popupAddCardOpenButton = document.querySelector('.profile__add-button');
export const nameInput = document.querySelector('.popup__item_el_name');
export const jobInput = document.querySelector('.popup__item_el_job');
export const formEdit = document.querySelector('.popup__form_type_red');
export const formAdd = document.querySelector('.popup__form_type_add');
export const formImg = document.querySelector('.popup__form_type_imgred')
export const objectProfileEdit = {
  firstname: '.profile__name',
  job: '.profile__description',
  newimg: '.profile__avatar'
}
export const imgEdit = document.querySelector('.profile__img-button');
