import { config } from "../utils/utils";

export class Api {
    #onResponse(res)  {
        return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
    }

    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }
    
    //

    getAllCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this.#onResponse)
    }
    
    //
    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this.#onResponse)
    }

    //добавления карточки
    addCard(body) {
        return fetch(`${this._baseUrl}/cards`, {
            'content-type': 'application/json',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this.#onResponse)
    }

    //редактирование профиля
    editProfile(body) {
        return fetch(`${this._baseUrl}/users/me`, {
            'content-type': 'application/json',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this.#onResponse)
    }
    
    //редактирование аватара
    editAvatar(body) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            'content-type': 'application/json',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this.#onResponse)
    }
    
    //удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponse)
    }
    
    //  лайк
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this.#onResponse)
    }
    
    // удаление лайка
    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponse)
    }
}