//выбираем контейнер куда будут вставляться карточки
const containerCards = document.querySelector('.elements__list');

const popupCardImgFullSize = document.querySelector('.img-popup');

const inputUrlFormAddCard  = document.querySelector('#form-add-card input[name="url"]');
const inputNameFormAddCard = document.querySelector('#form-add-card input[name="name"]');



const urlValueImg =  document.querySelector('.img-popup__image');
const textValueImg = document.querySelector('.img-popup__title');

export const popupProfileEditForm = document.querySelector('.profile-popup');
export const popupCardAddForm = document.querySelector('.add-popup');
export const popupAvatarEditForm = document.querySelector('.avatar-popup');

export const submitButtonCard = popupCardAddForm.querySelector('.add-popup__submit');
export const submitButtonProfile = popupProfileEditForm.querySelector('.add-popup__submit');
export const submitButtonAvatar = popupAvatarEditForm.querySelector('.add-popup__submit');

function setImgValue(evt) {
    urlValueImg.src = evt.target.src;
    urlValueImg.alt = evt.target.alt;
    textValueImg.textContent = evt.target.alt;
}

export {setImgValue, containerCards, popupCardImgFullSize, inputNameFormAddCard, inputUrlFormAddCard};