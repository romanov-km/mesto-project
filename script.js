let popup = document.querySelector('.popup');

let openPopupButton = document.querySelector('.profile__edit-button');
openPopupButton.addEventListener('click', togglePopup);

let closePopupButton = document.querySelector('.popup__closed-button');
closePopupButton.addEventListener('click', togglePopup);

// функция открытия и закрытия попапа на профиле
function togglePopup() {
    popup.classList.toggle('popup_opened');
}

// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('#form-edit-profile input[name="name"]'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('#form-edit-profile input[name="activity"]'); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    let jobValue = jobInput.value;
    console.log(jobValue);
    let nameValue = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let newName = document.querySelector('.profile__name');
    let newActivity = document.querySelector('.profile__activity');
    // Вставьте новые значения с помощью textContent
    newName.textContent = nameInput.value;
    newActivity.textContent = jobInput.value;
    togglePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
