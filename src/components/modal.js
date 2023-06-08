// функция открытия и закрытия попапа на профиле
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//функция закрытия окна при клику по оверлею
function handleOverlay() {
    document.addEventListener('click', function(evt) {
        closePopup(evt.target);
    });
}

//функция закрытия при нажатии клавиши Escape
function handleEscKey() {
    document.addEventListener('keydown', function(evt) {
       if (evt.key === 'Escape' && document.querySelector('.popup_opened')) {
        const popup = document.querySelector('.popup_opened');    
        closePopup(popup);
       }
    });
}

handleEscKey();
handleOverlay();

export {closePopup, openPopup};