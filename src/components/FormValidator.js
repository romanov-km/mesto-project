export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(settings.submitButtonSelector);
    //console.log(this._buttonElement);
    //console.log(this._formElement);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formSelector = settings.formSelector;
    //console.log(this._formSelector, 123);
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    //console.log(this._formList, 123);
  }

  _getError(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getError(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._getError(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid = (inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
  }

  _setEventListeners = () => {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
};

  _hasInvalidInput = () => {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  makeButtonDisabled = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  clearErrors = () => {
    this._inputElements.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  }

  enableValidation = () => {
  this._setEventListeners();
}
}