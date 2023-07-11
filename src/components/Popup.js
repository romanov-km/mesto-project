export class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closePopupByEsc = this._closePopupByEsc.bind(this);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupByEsc);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.addEventListener('keydown', this._closePopupByEsc);

    }
    _closePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__closed-button')) {  //Добавить проверку на все кнопки закрытия
                this.close();
            }
        });
    }
}