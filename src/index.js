import './pages/index.css'; // добавьте импорт главного файла стилей
import enableValidation from './components/validate.js';
import {renderCards, setProfileInputValue, handleProfileEditFormSubmit, addCardSubmit} from './components/cards.js';
import {closePopup, openPopup} from './components/modal.js';

const popupProfileEditForm = document.querySelector('.profile-popup');
const popupCardAddForm = document.querySelector('.add-popup');

const buttonOpenProfileEditForm = document.querySelector('.profile__edit-button');
const buttonCloseProfileEditForm = document.querySelector('.popup__closed-button');

const buttonOpenCardAddForm = document.querySelector('.profile__add-button');
const buttonCloseCardAddForm = document.querySelector('.add-popup__closed-button');

const formProfileEdit = document.querySelector('#form-edit-profile');

const formCardAdd = document.querySelector('#form-add-card'); //

const buttonCloseImgPopup = document.querySelector('.img-popup__closed-button');
const popupCardImgFullSize = document.querySelector('.img-popup');

renderCards();

function makeProfileEditForm() {
    openPopup(popupProfileEditForm);
    setProfileInputValue();
}

enableValidation({
    formSelector: '.add-popup__form',
    inputSelector: '.add-popup__text-input',
    submitButtonSelector: '.add-popup__submit',
    inactiveButtonClass: 'add-popup__submit_inactive',
    inputErrorClass: 'add-popup__text-input_type_error',
    errorClass: 'add-popup__input-error_active'
  }); 

buttonOpenProfileEditForm.addEventListener('click', makeProfileEditForm);

buttonCloseProfileEditForm.addEventListener('click', () => closePopup(popupProfileEditForm));

buttonOpenCardAddForm.addEventListener('click',() => {
    openPopup(popupCardAddForm);
    formCardAdd.reset();
});
buttonCloseCardAddForm.addEventListener('click', () => closePopup(popupCardAddForm));

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfileEdit.addEventListener('submit', handleProfileEditFormSubmit);

buttonCloseImgPopup.addEventListener('click', () => {closePopup(popupCardImgFullSize)});

formCardAdd.addEventListener('submit', addCardSubmit); //обработчик сабмита добавления карточки