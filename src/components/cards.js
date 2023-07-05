import { setImgValue, containerCards, popupCardImgFullSize, inputNameFormAddCard, inputUrlFormAddCard, popupCardAddForm } from "./utils";
import { openPopup, closePopup } from "./modal";
import { handleClickDelete, setStatusButton, userId } from "..";
import { submitButtonCard } from "./utils";
import { api, section } from "..";

/*,,*/
export class Card {
    constructor(cardData, selector, userId, handleLikeCard,handleDeleteCard, handleClickCard) {
        this._selector = selector;
        this._name = cardData.name;
        this._image = cardData.image;
        this._likes = cardData.likes;
        this._link = cardData.link;
        this._cardId = cardData._id;
        this._userId = userId;
        this._ownerId = cardData.owner._id;
        this._handleDeleteCard = handleDeleteCard;
        this._handleClickCard = handleClickCard;
        this._handleLikeCard = handleLikeCard;


    }
    //копируем шаблон
    _getTemplate() {
        const cardElement = document.querySelector(this._selector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }
    checkLikes() {

        return this._likes.some(like => {
            return like._id === this._userId;
        });
      }
      
      likesNumber() {
        this._cardLikeNumber.textContent = this._likes.length;
       
    }
    
      toggleLikeBtn() {
        this._cardLikeButton.classList.toggle("elements__button-like_active");
    }
    _cardTrash(){
        if (this._ownerId !== this._userId){
            this._cardDeleteButton.remove();
        }
    }

      deleteCard() {
        this._card.remove();
      }
    //создание карточки
    createCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardTitle = this._card.querySelector('.elements__title');
        this._cardTitle.textContent = this._name;
        this._cardLikeButton = this._card.querySelector('.elements__button-like');
        this._cardDeleteButton = this._card.querySelector('.elements__button-delete');
        this._cardLikeNumber = this._card.querySelector('.elements__number-like');
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;

        this._card.setAttribute('cardData-id', `${this.id}`);
        this._setEventListeners();
        this.likesNumber();
        this._cardTrash()
         if (this.checkLikes()) this.toggleLikeBtn();
         return this._card;

    }

    
    _setEventListeners() {
       // this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard(this));
        this._cardLikeButton.addEventListener('click', () => this._handleLikeCard(this));
        this._cardImage.addEventListener('click', () => this._handleClickCard(this));
    }
    
  
    //новая карточка
   
}
/*
function addCardSubmit(evt) {
    evt.preventDefault(); //отменяет стандартную отравку формы
    setStatusButton({ buttonElement: submitButtonCard, text: 'Сохранение...', disabled: true });
    const newCardData = {
        name: inputNameFormAddCard.value,
        link: inputUrlFormAddCard.value,
    }
    api.addCard(newCardData)
        .then((dataCard) => {
            //section.addItem(dataCard);

            containerCards.prepend(createCard(dataCard));
            closePopup(popupCardAddForm);
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
            setStatusButton({ buttonElement: submitButtonCard, text: 'Сохранить', disabled: false });
        });

}

// функция получает данные для создания карточки и возвращает готовую разметку
export function createCard(cardData) {
    const nameCard = cardData.name;
    const urlCard = cardData.link;
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);

    const buttonCardDelete = cardElement.querySelector('.elements__button-delete');

    if (cardData.owner._id !== userId) {
        buttonCardDelete.remove();
    }
    buttonCardDelete.addEventListener('click', () => handleClickDelete(cardData, cardElement));

    const buttonOpenImg = cardElement.querySelector('.elements__image');
    buttonOpenImg.src = urlCard;
    buttonOpenImg.alt = nameCard;

    cardElement.querySelector('.elements__title').textContent = nameCard;

    //likes 
    const cardLike = cardElement.querySelector('.elements__number-like');
    cardLike.textContent = cardData.likes.length;

    const cardButtonLike = cardElement.querySelector('.elements__button-like')
    if (cardData.likes.find((likes) => likes._id === userId)) {
        makeLikeInCard(cardButtonLike);
    }

    cardButtonLike.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('elements__button-like_active')) {
            api.unlikeCard(cardData._id)
                .then((dataLike) => {
                    cardLike.textContent = dataLike.likes.length;
                    makeLikeInCard(cardButtonLike);
                })
                .catch((error => { console.log(error) }));
        } else {
            api.likeCard(cardData._id)
                .then((dataLike) => {
                    cardLike.textContent = dataLike.likes.length;
                    makeLikeInCard(cardButtonLike);
                })
                .catch((error) => { console.log(error) });
        }
    });

    buttonOpenImg.addEventListener('click', openPopupImgFullSize);

    return cardElement
}

const openPopupImgFullSize = (evt) => {
    setImgValue(evt);
    openPopup(popupCardImgFullSize);
}

const makeLikeInCard = (target) => {
    target.classList.toggle('elements__button-like_active');
}

export { addCardSubmit };*/