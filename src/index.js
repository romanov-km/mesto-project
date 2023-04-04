import initialCards from './cards.js';

// handleformsubmit
let newName = document.querySelector('.profile__name'); // более явное наименование
let newActivity = document.querySelector('.profile__activity'); // более явное наименование

// Находим поля формы в DOM
const inputNameFormProfile = document.querySelector('#form-edit-profile input[name="name"]'); //имя фикс
const inputJobFormProfile = document.querySelector('#form-edit-profile input[name="activity"]'); // имя фикс

const urlValueImg =  document.querySelector('.img-popup__image');
const textValueImg = document.querySelector('.img-popup__title');

const profileEditFormPopup = document.querySelector('.popup'); //имя фикс
const cardAddFormPopup = document.querySelector('.add-popup'); //

const profileEditFormOpenButton = document.querySelector('.profile__edit-button'); //
const profileEditFormCloseButton = document.querySelector('.popup__closed-button'); //

const cardAddFormOpenButton = document.querySelector('.profile__add-button');
const cardAddFormCloseButton = document.querySelector('.add-popup__closed-button');

const profileEditForm = document.querySelector('.popup__form');

const formAddCard = document.querySelector('#form-add-card');
const urlInput = document.querySelector('#form-add-card input[name="url"]');
const nameAddInput = document.querySelector('#form-add-card input[name="name"]');

const cardImgFullSizePopup = document.querySelector('.img-popup');
const closeImgPopupButton = document.querySelector('.img-popup__close-button');

//выбираем контейнер куда будут вставляться карточки
const cardsContainer = document.querySelector('.elements__list');

const addCardForm = document.querySelector('.add-popup__form');

//функция закрытия большой картинки


//функция открытия и закрытия попапа добавления карточки
function openAddPopup() {
    cardAddFormPopup.classList.add('add-popup_opened');
    formAddCard.reset();
}

function closeAddPopup() {
    cardAddFormPopup.classList.remove('add-popup_opened');
    
}

// функция добавления новой карточки
function addCardSubmit(evt) {
    evt.preventDefault(); //отменяет стандартную отравку формы
    cardsContainer.prepend(createCard(urlInput.value, nameAddInput.value));
    closeAddPopup();
    
}

// функция открытия и закрытия попапа на профиле
function openPopup() {
    profileEditFormPopup.classList.add('popup_opened');
    inputNameFormProfile.value = document.querySelector('.profile__name').textContent;
    inputJobFormProfile.value = document.querySelector('.profile__activity').textContent;
}

function closePopup() {
    profileEditFormPopup.classList.remove('popup_opened');
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
    cardsContainer.append(createCard(initialCards[i].link, initialCards[i].name));
    }
}

// функция удаления карточки
function deleteCardButton(evt) {
    evt.target.closest('li').remove();
}

//функция закрытия открытия попапа по клику на карточку
function closeImgPopup() {
    cardImgFullSizePopup.classList.remove('img-popup_opened');
}

function openImgPopup(evt) {
    cardImgFullSizePopup.classList.add('img-popup_opened');
    urlValueImg.src = evt.target.src;
    urlValueImg.alt = evt.target.alt;
    textValueImg.textContent = evt.target.alt;
}

renderCards();


profileEditFormOpenButton.addEventListener('click', openPopup);
profileEditFormCloseButton.addEventListener('click', closePopup);

cardAddFormOpenButton.addEventListener('click', openAddPopup);
cardAddFormCloseButton.addEventListener('click', closeAddPopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);

closeImgPopupButton.addEventListener('click', closeImgPopup);

addCardForm.addEventListener('submit', addCardSubmit); //обработчик сабмита добавления карточки