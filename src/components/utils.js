const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//выбираем контейнер куда будут вставляться карточки
const containerCards = document.querySelector('.elements__list');

const popupCardImgFullSize = document.querySelector('.img-popup');

const inputUrlFormAddCard  = document.querySelector('#form-add-card input[name="url"]');
const inputNameFormAddCard = document.querySelector('#form-add-card input[name="name"]');

const popupCardAddForm = document.querySelector('.add-popup');

const urlValueImg =  document.querySelector('.img-popup__image');
const textValueImg = document.querySelector('.img-popup__title');

function setImgValue(evt) {
    urlValueImg.src = evt.target.src;
    urlValueImg.alt = evt.target.alt;
    textValueImg.textContent = evt.target.alt;
}

export {setImgValue, initialCards, containerCards, popupCardImgFullSize, inputNameFormAddCard, inputUrlFormAddCard, popupCardAddForm};