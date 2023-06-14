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

getAllCards();

export function addCard(body) {
    return fetch(`${config.baseUrl}/cards`, {
        'content-type': 'application/json',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(onResponse)
}

export function editCard(body, idCard) {
    return fetch(`${config.baseUrl}/cards/${idCard}`, {
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



// // Не забывайте проверять, всё ли в порядке с ответом. Для этого можно использовать res.ok или res.status:
// export const getInitialCards = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//         headers: config.headers
//     })
//         .then(res => {
//             if (res.ok) {
//                 return res.json();
//             }
//         return Promise.reject(`Ошибка: ${res.status}`);
//         });
// }

// // Используйте свойства name, about и avatar в соответствующих элементах шапки страницы. Свойство _id — идентификатор пользователя, в данном случае вашего.

// export const getUserInfo = () => {
//     return fetch(`${config.baseUrl}/users/me`, {
//         headers: config.headers,
//         method: 'GET'
//     })
//         .then(res => {
//             if (res.ok) {
//                 return res.json();
//             }
//         return Promise.reject(`Ошибка: ${res.status}`);
//     });
// }

//У каждой карточки есть свойства name и link — это заголовок и ссылка на картинку — они понадобятся при отображении каждой отдельной карточки.