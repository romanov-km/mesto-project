import './pages/index.css'; // добавьте импорт главного файла стилей
import { enableValidation, makeButtonDisabled, clearErrors } from './components/validate';
import { addCardSubmit, createCard} from './components/cards';
import {closePopup, openPopup} from './components/modal';
import { submitButtonCard, submitButtonProfile, submitButtonAvatar, popupCardAddForm, popupProfileEditForm, popupAvatarEditForm, containerCards} from './components/utils';
import { config } from './components/api';
import { Api } from './components/api';
import { Section } from './components/Section';
import { UserInfo } from './components/UserInfo';

export let userId = 0;
const settings = {
    formSelector: '.add-popup__form',
    inputSelector: '.add-popup__text-input',
    submitButtonSelector: '.add-popup__submit',
    inactiveButtonClass: 'add-popup__submit_inactive',
    inputErrorClass: 'add-popup__text-input_type_error',
    errorClass: 'add-popup__input-error_active'
};

const buttonOpenProfileEditForm = document.querySelector('.profile__edit-button');
const buttonCloseProfileEditForm = document.querySelector('.popup__closed-button');

const buttonOpenCardAddForm = document.querySelector('.profile__add-button');
const buttonCloseCardAddForm = document.querySelector('.add-popup__closed-button');

const buttonOpenAvatarForm = document.querySelector('.profile__edit-button-avatar');
const buttonCloseAvatarEditForm = document.querySelector('.avatar-popup__closed-button');

// Находим форму в DOM
const formProfileEdit = document.querySelector('#form-edit-profile');
const formCardAdd = document.querySelector('#form-add-card');
const formAvatarEdit = document.querySelector('#form-avatar-edit');

const buttonCloseImgPopup = document.querySelector('.img-popup__closed-button');
const popupCardImgFullSize = document.querySelector('.img-popup');

// Находим поля формы в DOM
const inputNameFormProfile = document.querySelector('#form-edit-profile input[name="name"]');
const inputJobFormProfile = document.querySelector('#form-edit-profile input[name="activity"]');
const inputAvatarFormProfile = document.querySelector('#form-avatar-edit input[name="url"]');

//const newNameFormProfile = document.querySelector('.profile__name'); 
//const newActivityFormProfile = document.querySelector('.profile__activity');
//const newAvatarFormProfile = document.querySelector('.profile__avatar');

export const api = new Api(config);

export const section = new Section(
    {
        renderer: (item) => {
            const card = createCard(item);
            section.addItem(card);
        }
    },
    '.elements__list'
);

const userinfo = new UserInfo({nameSelector: '.profile__name', activitySelector: '.profile__activity'})

Promise.all([api.getProfileInfo(), api.getAllCards()])
    .then(([user, cards]) => {
        userId = user._id
        console.log(cards);
        console.log(userId);
        userinfo.setUserInfo({name: user.name , activity: user.about, userId: user._id});
        userinfo.setUserAvatar({avatar: user.avatar});
        //newNameFormProfile.textContent = user.name;
        //newActivityFormProfile.textContent = user.about;
        //newAvatarFormProfile.src = user.avatar;
        //inputNameFormProfile.value = user.name;
        //inputJobFormProfile.value = user.about;
        section.renderItems(cards);
        //cards.forEach((card) => {containerCards.append(createCard(card))})
    })
    .catch((error) => {console.log(error)});

export function setStatusButton({ buttonElement, text, disabled }) {
    if(disabled) {
        buttonElement.disabled = 'disabled';
    } else {
        buttonElement.disabled = false;
    }
    buttonElement.textContent = text;
}

function handleProfileEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    setStatusButton({buttonElement: submitButtonProfile, text: 'Сохранение...', disabled: true});
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    api.editProfile({name: inputNameFormProfile.value, about: inputJobFormProfile.value})
        .then(updateProfile => {
            console.log(userinfo);
            userinfo.setUserInfo({ name: updateProfile.name, activity: updateProfile.about});
            //newNameFormProfile.textContent = updateProfile.name;
            //newActivityFormProfile.textContent = updateProfile.about;
            closePopup(popupProfileEditForm);
        })
        .catch((error) => {console.log(error)})
        .finally(() => {
            setStatusButton({buttonElement: submitButtonProfile, text: 'Сохранить', disabled: false});
        });   
}

function handleAvatarEditFormSubmit(evt) {
    evt.preventDefault();
    setStatusButton({buttonElement: submitButtonAvatar, text: 'Сохранение...', disabled: true});
    api.editAvatar({avatar: inputAvatarFormProfile.value})
        .then(updateAvatar => {
            userinfo.setUserAvatar(updateAvatar);
            //inputAvatarFormProfile.textContent = updateAvatar.src;
            closePopup(popupAvatarEditForm);
        })
        .catch((error) => {console.log(error)})
        .finally(() => {
            setStatusButton({buttonElement: submitButtonAvatar, text: 'Сохранить', disabled: false});
            //newAvatarFormProfile.src = inputAvatarFormProfile.value;
        });
}

function makeProfileEditForm() {
    openPopup(popupProfileEditForm);
}

export const handleClickDelete = (cardData, cardElement) => {
    api.deleteCard(cardData._id)
        .then(() => {
            cardElement.closest('.elements__item').remove();
        })
        .catch((error) => {console.log(error)});
}

enableValidation(settings);

buttonOpenProfileEditForm.addEventListener('click',() => {
    makeProfileEditForm();
    clearErrors(formProfileEdit, settings);
});

buttonCloseProfileEditForm.addEventListener('click', () => {
    closePopup(popupProfileEditForm);
});

buttonOpenCardAddForm.addEventListener('click',() => {
    openPopup(popupCardAddForm);
    formCardAdd.reset();
    makeButtonDisabled(submitButtonCard, settings);
    clearErrors(formCardAdd, settings);
});

buttonCloseCardAddForm.addEventListener('click', () => {
    closePopup(popupCardAddForm);
});

buttonOpenAvatarForm.addEventListener('click', () => {
    openPopup(popupAvatarEditForm);
    formAvatarEdit.reset();
    makeButtonDisabled(submitButtonAvatar, settings);
    clearErrors(formAvatarEdit, settings);
})

buttonCloseAvatarEditForm.addEventListener('click', () => {
    closePopup(popupAvatarEditForm);
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formProfileEdit.addEventListener('submit', handleProfileEditFormSubmit);

buttonCloseImgPopup.addEventListener('click', () => {closePopup(popupCardImgFullSize)});

formCardAdd.addEventListener('submit', addCardSubmit); //обработчик сабмита добавления карточки

formAvatarEdit.addEventListener('submit', handleAvatarEditFormSubmit);

export default enableValidation;