import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._popupForm = this._popup.querySelector('.add-popup__form');
    this._popupInputs = Array.from(this._popupForm.querySelectorAll('.add-popup__text-input'));
    this._popupSubmitButton = this._popup.querySelector('.add-popup__submit');
  }

  _getInputValues() {
    const inputsValue = {};
    this._popupInputs.forEach(popupInput => {
      inputsValue[popupInput.name] = popupInput.value;
    });
    return inputsValue;
  }

  closePopup() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submit(this._getInputValues());
    })
  }
}