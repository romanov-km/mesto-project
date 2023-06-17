// return fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
//     headers: {
//         authorization: '35842094-b102-48a4-b183-719cf536cb76'
//     }
// })
//     .then(res => res.json())
//     .then((result) => {
//     console.log(result);
// });

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
    headers: {
        authorization: '35842094-b102-48a4-b183-719cf536cb76',
        "Content-Type": 'application/json'
    }
}

function onResponse(res)  {
    return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}

export function getAllCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(onResponse)
}

//getAllCards();
export function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(onResponse)
}

export function addCard(body) {
    return fetch(`${config.baseUrl}/cards`, {
        'content-type': 'application/json',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(onResponse)
}

export function editProfile(body) {
    return fetch(`${config.baseUrl}/users/me`, {
        'content-type': 'application/json',
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(onResponse)
}

export function editAvatar(body) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        'content-type': 'application/json',
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(onResponse)
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(onResponse)
}

//  лайк
export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(onResponse)
}

// удаление лайка
export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(onResponse)
}