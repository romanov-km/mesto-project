import initialCards from './cards.js';

// handleformsubmit
let newName = document.querySelector('.profile__name'); // более явное наименование
let newActivity = document.querySelector('.profile__activity'); // более явное наименование

// Находим поля формы в DOM
const inputNameFormProfile = document.querySelector('#form-edit-profile input[name="name"]'); //имя фикс
const inputJobFormProfile = document.querySelector('#form-edit-profile input[name="activity"]'); // имя фикс

const urlValueImg =  document.querySelector('.img-popup__image');
const textValueImg = document.querySelector('.img-popup__title');

const popupProfileEditForm = document.querySelector('.popup'); 
const popupCardAddForm = document.querySelector('.add-popup'); 

const buttonOpenProfileEditForm = document.querySelector('.profile__edit-button'); 
const buttonCloseProfileEditForm = document.querySelector('.popup__closed-button');

const buttonOpenCardAddForm = document.querySelector('.profile__add-button');
const buttonCloseCardAddForm = document.querySelector('.add-popup__closed-button');

const formProfileEdit = document.querySelector('.popup__form');

const formCardAdd = document.querySelector('#form-add-card');
const urlInput = document.querySelector('#form-add-card input[name="url"]');
const nameInput = document.querySelector('#form-add-card input[name="name"]');

const popupCardImgFullSize = document.querySelector('.img-popup');
const butonCloseImgPopup = document.querySelector('.img-popup__close-button');

//выбираем контейнер куда будут вставляться карточки
const containerCards = document.querySelector('.elements__list');

const formAddCard = document.querySelector('.add-popup__form');


//функция открытия и закрытия попапа добавления карточки
function openAddPopup() {
    popupCardAddForm.classList.add('add-popup_opened');
    formCardAdd.reset();
}

function closeAddPopup() {
    popupCardAddForm.classList.remove('add-popup_opened');
}

// функция добавления новой карточки
function addCardSubmit(evt) {
    evt.preventDefault(); //отменяет стандартную отравку формы
    containerCards.prepend(createCard(urlInput.value, nameInput.value));
    closeAddPopup();
    
}

// функция открытия и закрытия попапа на профиле
function openPopup() {
    popupProfileEditForm.classList.add('popup_opened');
    inputNameFormProfile.value = document.querySelector('.profile__name').textContent;
    inputJobFormProfile.value = document.querySelector('.profile__activity').textContent;
}

function closePopup() {
    popupProfileEditForm.classList.remove('popup_opened');
}

// Находим форму в DOM

function handleProfileEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    newName.textContent = inputNameFormProfile.value;
    newActivity.textContent = inputJobFormProfile.value;
    closePopup();
}

// функция получает данные для создания карточки и возвращает готовую разметку
function createCard(cardUrlValue, cardTitleValue) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    
    const buttonCardDelete = cardElement.querySelector('.elements__button-delete');
    const buttonOpenImg = cardElement.querySelector('.elements__image');
    buttonCardDelete.addEventListener('click', deleteCardButton);
    
    cardElement.querySelector('.elements__image').src = cardUrlValue;
    cardElement.querySelector('.elements__image').alt = cardTitleValue;
    cardElement.querySelector('.elements__title').textContent = cardTitleValue;
    
    cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__button-like_active');
    });
    buttonOpenImg.addEventListener('click', openImgPopup);
    return cardElement
}

// функция вставляет разметку карточки в DOM

function renderCards() {
    for(let i = 0; i < initialCards.length; i++) {
        containerCards.append(createCard(initialCards[i].link, initialCards[i].name));
    }
}

// функция удаления карточки
function deleteCardButton(evt) {
    evt.target.closest('li').remove();
}

//функция закрытия открытия попапа по клику на карточку
function closeImgPopup() {
    popupCardImgFullSize.classList.remove('img-popup_opened');
}

function openImgPopup(evt) {
    popupCardImgFullSize.classList.add('img-popup_opened');
    urlValueImg.src = evt.target.src;
    urlValueImg.alt = evt.target.alt;
    textValueImg.textContent = evt.target.alt;
}

renderCards();


buttonOpenProfileEditForm.addEventListener('click', openPopup);
buttonCloseProfileEditForm.addEventListener('click', closePopup);

buttonOpenCardAddForm.addEventListener('click', openAddPopup);
buttonCloseCardAddForm.addEventListener('click', closeAddPopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfileEdit.addEventListener('submit', handleProfileEditFormSubmit);

butonCloseImgPopup.addEventListener('click', closeImgPopup);

formAddCard.addEventListener('submit', addCardSubmit); //обработчик сабмита добавления карточки