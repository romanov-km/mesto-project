import initialCards from '../vendor/cards.js';

const popup = document.querySelector('.popup');
const addpopup = document.querySelector('.add-popup');

const openPopupButton = document.querySelector('.profile__edit-button');
openPopupButton.addEventListener('click', openPopup);
const closePopupButton = document.querySelector('.popup__closed-button');
closePopupButton.addEventListener('click', closePopup);


const openAddPopupButton = document.querySelector('.profile__add-button');
openAddPopupButton.addEventListener('click', openAddPopup);
const closeAddPopupButton = document.querySelector('.add-popup__closed-button');
closeAddPopupButton.addEventListener('click', closeAddPopup);


const urlInput = document.querySelector('#form-add-card input[name="url"]');
const nameAddInput = document.querySelector('#form-add-card input[name="name"]');

//функция открытия и закрытия попапа добавления карточки
function openAddPopup() {
    addpopup.classList.add('add-popup_opened');
    
}

function closeAddPopup() {
    addpopup.classList.remove('add-popup_opened');
    urlInput.value = '';
    nameAddInput.value = '';
}
//выбираем контейнер куда будут вставляться карточки
const cardsContainer = document.querySelector('.elements__list');

const addCardForm = document.querySelector('.add-popup__form');

// функция добавления новой карточки
function addCardSubmit(evt) {
    evt.preventDefault(); //отменяет стандартную отравку формы
    cardsContainer.prepend(createCard(urlInput.value, nameAddInput.value));
}

addCardForm.addEventListener('submit', addCardSubmit); //обработчик сабмита добавления карточки


// функция открытия и закрытия попапа на профиле
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__activity').textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const jobInput = document.querySelector('#form-edit-profile input[name="activity"]');
const nameInput = document.querySelector('#form-edit-profile input[name="name"]');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    let jobValue = jobInput.value;
    let nameValue = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let newName = document.querySelector('.profile__name');
    let newActivity = document.querySelector('.profile__activity');
    // Вставьте новые значения с помощью textContent
    newName.textContent = nameInput.value;
    newActivity.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// функция получает данные для создания карточки и возвращает готовую разметку
function createCard(cardUrlValue, cardTitleValue) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    
    const buttonCardDelete = cardElement.querySelector('.elements__button-delete');
    buttonCardDelete.addEventListener('click', deleteCardButton);
    
    cardElement.querySelector('.elements__image').src = cardUrlValue;
    cardElement.querySelector('.elements__title').textContent = cardTitleValue;
    cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__button-like_active');
    });
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

renderCards();