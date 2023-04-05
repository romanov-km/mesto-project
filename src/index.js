import initialCards from './cards.js';

const newNameFormProfile = document.querySelector('.profile__name'); 
const newActivityFormProfile = document.querySelector('.profile__activity');

// Находим поля формы в DOM
const inputNameFormProfile = document.querySelector('#form-edit-profile input[name="name"]');
const inputJobFormProfile = document.querySelector('#form-edit-profile input[name="activity"]');

const urlValueImg =  document.querySelector('.img-popup__image');
const textValueImg = document.querySelector('.img-popup__title');

const popupProfileEditForm = document.querySelector('.profile-popup'); 
const popupCardAddForm = document.querySelector('.add-popup'); 

const buttonOpenProfileEditForm = document.querySelector('.profile__edit-button'); 
const buttonCloseProfileEditForm = document.querySelector('.popup__closed-button');

const buttonOpenCardAddForm = document.querySelector('.profile__add-button');
const buttonCloseCardAddForm = document.querySelector('.add-popup__closed-button');

const formProfileEdit = document.querySelector('.popup__form');

const formCardAdd = document.querySelector('#form-add-card'); //

const inputUrlFormAddCard  = document.querySelector('#form-add-card input[name="url"]');
const  inputNameFormAddCard = document.querySelector('#form-add-card input[name="name"]');

const popupCardImgFullSize = document.querySelector('.img-popup');
const butonCloseImgPopup = document.querySelector('.img-popup__closed-button');

//выбираем контейнер куда будут вставляться карточки
const containerCards = document.querySelector('.elements__list');

// функция открытия и закрытия попапа на профиле
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

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

function setImgValue(evt) {
    urlValueImg.src = evt.target.src;
    urlValueImg.alt = evt.target.alt;
    textValueImg.textContent = evt.target.alt;
}

renderCards();

function makeProfileEditForm() {
    openPopup(popupProfileEditForm);
    setProfileInputValue();
}

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

butonCloseImgPopup.addEventListener('click', () => {closePopup(popupCardImgFullSize)});

formCardAdd.addEventListener('submit', addCardSubmit); //обработчик сабмита добавления карточки