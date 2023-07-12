// const showInputError = (formElement, inputElement, errorMessage, settings) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(settings.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(settings.errorClass);
// }

// const hideInputError = (formElement, inputElement, settings) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(settings.inputErrorClass);
//     errorElement.classList.remove(settings.errorClass);
//     errorElement.textContent = '';
// }

// const isValid = (formElement, inputElement, settings) => {
//     if (inputElement.validity.patternMismatch) {
//         // встроенный метод setCustomValidity принимает на вход строку
//         // и заменяет ею стандартное сообщение об ошибке
//         inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//         // если передать пустую строку, то будут доступны
//         // стандартные браузерные сообщения
//         inputElement.setCustomValidity('');
//     }
//     if (!inputElement.validity.valid) {
//         // третьим аргументом мы передаём сообщение об ошибке,
//         // которое получаем из validationMessage
//         // теперь, если ошибка вызвана регулярным выражением,
//         // переменная validationMessage хранит наше кастомное сообщение
//         showInputError(formElement, inputElement, inputElement.validationMessage, settings);
//     } else {
//         hideInputError(formElement, inputElement, settings);
//     }
// }

// const setEventListeners = (formElement, settings) => {
//     // Находим все поля внутри формы,
//     // сделаем из них массив методом Array.from
//     const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
//     // найдем кнопочку
//     const buttonElement = formElement.querySelector(settings.submitButtonSelector);
//     toggleButtonState(inputList, buttonElement, settings);
//     // Обойдём все элементы полученной коллекции
//     inputList.forEach((inputElement) => {
//       // каждому полю добавим обработчик события input
//     inputElement.addEventListener('input', () => {
//         // Внутри колбэка вызовем isValid,
//         // передав ей форму и проверяемый элемент
//         isValid(formElement, inputElement, settings);
//         toggleButtonState(inputList, buttonElement, settings);
//     });
//     });
// };

// const enableValidation = (settings) => {
//     // Найдём все формы с указанным классом в DOM,
//     // сделаем из них массив методом Array.from
//     const formList = Array.from(document.querySelectorAll(settings.formSelector));
//     // Переберём полученную коллекцию
//     formList.forEach((formElement) => {
//         formElement.addEventListener('submit', function(evt) {
//         evt.preventDefault();
//     })
//       // Для каждой формы вызовем функцию setEventListeners,
//       // передав ей элемент формы
//     setEventListeners(formElement, settings);
//     });
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     })
// }

// //функция активирования кнопки
// const toggleButtonState = (inputList, buttonElement, settings) => {
//     if (hasInvalidInput(inputList)) {
//         buttonElement.disabled = true;
//         buttonElement.classList.add(settings.inactiveButtonClass);
//     } else {
//         buttonElement.disabled = false;
//         buttonElement.classList.remove(settings.inactiveButtonClass);
//     }
// }

// export const makeButtonDisabled = (buttonElement, settings) => {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(settings.inactiveButtonClass);
// }

// export const clearErrors = (formElement, settings) => {
//     const inputElements = formElement.querySelectorAll(settings.inputSelector); // Выбираем все поля ввода внутри формы
//      // Проверяем каждое поле ввода и стираем ошибки
//     inputElements.forEach((inputElement) => {
//         hideInputError(formElement, inputElement, settings);
//     });
// }

//export {enableValidation};