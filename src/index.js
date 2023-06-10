import './pages/index.css'; // добавьте импорт главного файла стилей
import { enableValidation, makeButtonDisabled } from './components/validate.js';
import {renderCards, addCardSubmit} from './components/cards.js';
import {closePopup, openPopup} from './components/modal.js';
import { clearErrors } from './components/validate.js';


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


// Находим поля формы в DOM
const inputNameFormProfile = document.querySelector('#form-edit-profile input[name="name"]');
const inputJobFormProfile = document.querySelector('#form-edit-profile input[name="activity"]');

const newNameFormProfile = document.querySelector('.profile__name'); 
const newActivityFormProfile = document.querySelector('.profile__activity');

// Находим форму в DOM

function handleProfileEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    newNameFormProfile.textContent = inputNameFormProfile.value;
    newActivityFormProfile.textContent = inputJobFormProfile.value;
    closePopup(popupProfileEditForm);
}

function setProfileInputValue() {
    inputNameFormProfile.value = newNameFormProfile.textContent;
    inputJobFormProfile.value = newActivityFormProfile.textContent;
}

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

renderCards();

buttonOpenProfileEditForm.addEventListener('click', makeProfileEditForm);

buttonCloseProfileEditForm.addEventListener('click', () => {
    closePopup(popupProfileEditForm);
});

buttonOpenCardAddForm.addEventListener('click',() => {
    openPopup(popupCardAddForm);
    formCardAdd.reset();
    const buttonElement = document.querySelector('.add-popup__submit');
    makeButtonDisabled(buttonElement);
});

buttonCloseCardAddForm.addEventListener('click', () => {
    closePopup(popupCardAddForm);
    clearErrors(popupCardAddForm);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfileEdit.addEventListener('submit', handleProfileEditFormSubmit);

buttonCloseImgPopup.addEventListener('click', () => {closePopup(popupCardImgFullSize)});

formCardAdd.addEventListener('submit', addCardSubmit); //обработчик сабмита добавления карточки

export default enableValidation;