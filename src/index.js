import initialCards from '../vendor/cards.js';

const popup = document.querySelector('.popup');

const openPopupButton = document.querySelector('.profile__edit-button');
openPopupButton.addEventListener('click', openPopup);

const closePopupButton = document.querySelector('.popup__closed-button');
closePopupButton.addEventListener('click', closePopup);


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
    const cardsContainer = document.querySelector('.elements__list');
    for(let i = 0; i < initialCards.length; i++) {
    cardsContainer.append(createCard(initialCards[i].link, initialCards[i].name));
    }
}

// функция удаления карточки
function deleteCardButton(evt) {
    evt.target.closest('li').remove();
}

renderCards();