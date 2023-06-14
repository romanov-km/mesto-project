import {setImgValue, initialCards, containerCards, popupCardImgFullSize, inputNameFormAddCard, inputUrlFormAddCard, popupCardAddForm} from "./utils";
import {openPopup, closePopup} from "./modal";
import { addCard, deleteCard, getAllCards } from "./api";


// urlInput.value, nameInput.value
// функция добавления новой карточки
function addCardSubmit(evt) {
    evt.preventDefault(); //отменяет стандартную отравку формы
    const newCardData = {
        name: inputNameFormAddCard.value,
        link: inputUrlFormAddCard.value,
    }
    addCard(newCardData)
        .then((dataCard) => {
            containerCards.prepend(createCard(dataCard));
        })
    closePopup(popupCardAddForm);
}

// функция получает данные для создания карточки и возвращает готовую разметку
function createCard(cardData) {
    const nameCard = cardData.name;
    const urlCard = cardData.link;
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    
    const buttonCardDelete = cardElement.querySelector('.elements__button-delete');
    const buttonOpenImg = cardElement.querySelector('.elements__image');
    buttonCardDelete.addEventListener('click', () => {
        deleteCard(cardData._id)
            .then(() => {
                cardElement.remove();
                //deleteCardButton
            })
        });
    
    buttonOpenImg.src = urlCard;
    buttonOpenImg.alt = nameCard;
    cardElement.querySelector('.elements__title').textContent = nameCard;
    
    cardElement.querySelector('.elements__button-like').addEventListener('click', makeLikeInCard);
    buttonOpenImg.addEventListener('click', openPopupImgFullSize);
    return cardElement
}

// функция вставляет разметку карточки в DOM
function renderCards() {
    getAllCards()
        .then(allCards => {
            allCards.forEach((card) => {containerCards.append(createCard(card))})
        })
    
}

// функция удаления карточки
function deleteCardButton(evt) {
    evt.target.closest('li').remove();
}

const openPopupImgFullSize = (evt) => {
  setImgValue(evt);
  openPopup(popupCardImgFullSize);
}

const makeLikeInCard = (evt) => {
  evt.target.classList.toggle('elements__button-like_active');
}

export {renderCards, addCardSubmit};