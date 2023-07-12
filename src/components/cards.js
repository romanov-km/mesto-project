import { setImgValue, containerCards, popupCardImgFullSize, inputNameFormAddCard, inputUrlFormAddCard, popupCardAddForm } from "./utils";
import { api, section } from "..";


// function addCardSubmit(evt) {
//     evt.preventDefault(); //отменяет стандартную отравку формы
//     setStatusButton({ buttonElement: submitButtonCard, text: 'Сохранение...', disabled: true });
//     const newCardData = {
//         name: inputNameFormAddCard.value,
//         link: inputUrlFormAddCard.value,
//     }
//     api.addCard(newCardData)
//         .then((dataCard) => {
//             //section.addItem(dataCard);

//             containerCards.prepend(createCard(dataCard));
//             closePopup(popupCardAddForm);
//         })
//         .catch((err) => { console.log(err) })
//         .finally(() => {
//             setStatusButton({ buttonElement: submitButtonCard, text: 'Сохранить', disabled: false });
//         });

// }

// функция получает данные для создания карточки и возвращает готовую разметку
// export function createCard(cardData) {
//     const nameCard = cardData.name;
//     const urlCard = cardData.link;
//     const cardTemplate = document.querySelector('#card').content;
//     const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);

//     const buttonCardDelete = cardElement.querySelector('.elements__button-delete');

//     if (cardData.owner._id !== userId) {
//         buttonCardDelete.remove();
//     }
//     buttonCardDelete.addEventListener('click', () => handleClickDelete(cardData, cardElement));

//     const buttonOpenImg = cardElement.querySelector('.elements__image');
//     buttonOpenImg.src = urlCard;
//     buttonOpenImg.alt = nameCard;

//     cardElement.querySelector('.elements__title').textContent = nameCard;

//     //likes
//     const cardLike = cardElement.querySelector('.elements__number-like');
//     cardLike.textContent = cardData.likes.length;

//     const cardButtonLike = cardElement.querySelector('.elements__button-like')
//     if (cardData.likes.find((likes) => likes._id === userId)) {
//         makeLikeInCard(cardButtonLike);
//     }

//     cardButtonLike.addEventListener('click', (evt) => {
//         if (evt.target.classList.contains('elements__button-like_active')) {
//             api.unlikeCard(cardData._id)
//                 .then((dataLike) => {
//                     cardLike.textContent = dataLike.likes.length;
//                     makeLikeInCard(cardButtonLike);
//                 })
//                 .catch((error => { console.log(error) }));
//         } else {
//             api.likeCard(cardData._id)
//                 .then((dataLike) => {
//                     cardLike.textContent = dataLike.likes.length;
//                     makeLikeInCard(cardButtonLike);
//                 })
//                 .catch((error) => { console.log(error) });
//         }
//     });

//     buttonOpenImg.addEventListener('click', openPopupImgFullSize);

//     return cardElement
// }

// const openPopupImgFullSize = (evt) => {
//     setImgValue(evt);
//     openPopup(popupCardImgFullSize);
// }

// const makeLikeInCard = (target) => {
//     target.classList.toggle('elements__button-like_active');
// }

// export { addCardSubmit };
