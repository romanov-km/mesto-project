import { Popup } from './Popup';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._image = this._popup.querySelector('.img-popup__image');
        //console.log(this._image);
        this._title = this._popup.querySelector('.img-popup__title');
    }

    openPopup(name, link) {
        super.open();

        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;

    }
}