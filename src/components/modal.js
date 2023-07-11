// // функция открытия и закрытия попапа на профиле
// function openPopup(popup) {
//     document.addEventListener('keydown', closePopupByEsc);
//     popup.classList.add('popup_opened');
// }

// function closePopup(popup) {
//     document.addEventListener('keydown', closePopupByEsc);
//     popup.classList.remove('popup_opened');
// }

// //функция закрытия окна при клику по оверлею
// function closePopupByClickOnOverlay() {
//     document.addEventListener('click', function(evt) {
//         closePopup(evt.target);
//     });
// }

// const closePopupByEsc = (evt) => {
//     if (evt.key === 'Escape') {
//         const popup = document.querySelector('.popup_opened');
//         closePopup(popup);
//     }
// }

// closePopupByClickOnOverlay();

// export {closePopup, openPopup};
