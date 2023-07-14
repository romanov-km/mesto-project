//выбираем контейнер куда будут вставляться карточки
const containerCards = document.querySelector('.elements__list');

const popupCardImgFullSize = document.querySelector('.img-popup');

const inputUrlFormAddCard  = document.querySelector('#form-add-card input[name="url"]');
const inputNameFormAddCard = document.querySelector('#form-add-card input[name="name"]');

export const settings = {
    formSelector: '.add-popup__form',
    inputSelector: '.add-popup__text-input',
    submitButtonSelector: '.add-popup__submit',
    inactiveButtonClass: 'add-popup__submit_inactive',
    inputErrorClass: 'add-popup__text-input_type_error',
    errorClass: 'add-popup__input-error_active'
};
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
    headers: {
        authorization: '35842094-b102-48a4-b183-719cf536cb76',
        "Content-Type": 'application/json'
    }
}
export function setStatusButton({ buttonElement, text, disabled }) {
    if (disabled) {
        buttonElement.disabled = 'disabled';
    } else {
        buttonElement.disabled = false;
    }
    buttonElement.textContent = text;
}

export const popupProfileEditForm = document.querySelector('.profile-popup');
export const popupCardAddForm = document.querySelector('.add-popup');
export const popupAvatarEditForm = document.querySelector('.avatar-popup');

export const submitButtonCard = popupCardAddForm.querySelector('.add-popup__submit');
export const submitButtonProfile = popupProfileEditForm.querySelector('.add-popup__submit');
export const submitButtonAvatar = popupAvatarEditForm.querySelector('.add-popup__submit');

export {containerCards, popupCardImgFullSize, inputNameFormAddCard, inputUrlFormAddCard};