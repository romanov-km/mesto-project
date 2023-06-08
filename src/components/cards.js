import setImgValue from "./utils";
import {openPopup, closePopup} from "./modal";

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

// Находим поля формы в DOM
const inputNameFormProfile = document.querySelector('#form-edit-profile input[name="name"]');
const inputJobFormProfile = document.querySelector('#form-edit-profile input[name="activity"]');


const newNameFormProfile = document.querySelector('.profile__name'); 
const newActivityFormProfile = document.querySelector('.profile__activity');

const popupCardImgFullSize = document.querySelector('.img-popup');

const inputUrlFormAddCard  = document.querySelector('#form-add-card input[name="url"]');
const inputNameFormAddCard = document.querySelector('#form-add-card input[name="name"]');

const popupProfileEditForm = document.querySelector('.profile-popup');
const popupCardAddForm = document.querySelector('.add-popup');

function setProfileInputValue() {
    inputNameFormProfile.value = newNameFormProfile.textContent;
    inputJobFormProfile.value = newActivityFormProfile.textContent;
}

// urlInput.value, nameInput.value
// функция добавления новой карточки
function addCardSubmit(evt) {
    evt.preventDefault(); //отменяет стандартную отравку формы
    const newCardData = {
        name: inputNameFormAddCard.value,
        link: inputUrlFormAddCard.value,
    }
    containerCards.prepend(createCard(newCardData));
    closePopup(popupCardAddForm);
}

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

// функция получает данные для создания карточки и возвращает готовую разметку
function createCard(cardData) {
    const nameCard = cardData.name;
    const urlCard = cardData.link;
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    
    const buttonCardDelete = cardElement.querySelector('.elements__button-delete');
    const buttonOpenImg = cardElement.querySelector('.elements__image');
    buttonCardDelete.addEventListener('click', deleteCardButton);
    
    cardElement.querySelector('.elements__image').src = urlCard;
    cardElement.querySelector('.elements__image').alt = nameCard;
    cardElement.querySelector('.elements__title').textContent = nameCard;
    
    cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__button-like_active');
    });
    buttonOpenImg.addEventListener('click',(evt) => {
        setImgValue(evt);
        openPopup(popupCardImgFullSize);
    });
    return cardElement
}

// функция вставляет разметку карточки в DOM
function renderCards() {
    initialCards.forEach((card) => {containerCards.append(createCard(card))})
}

// функция удаления карточки
function deleteCardButton(evt) {
    evt.target.closest('li').remove();
}

export {renderCards, setProfileInputValue, handleProfileEditFormSubmit, addCardSubmit};