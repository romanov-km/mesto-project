import './pages/index.css'; // добавьте импорт главного файла стилей
//import { enableValidation, makeButtonDisabled, clearErrors } from './components/validate';
//import { addCardSubmit} from './components/cards';
//import { closePopup, openPopup } from './components/modal';
import { submitButtonCard, submitButtonProfile, submitButtonAvatar, containerCards, settings, setStatusButton} from './utils/utils';
import { config } from './utils/utils';
import { Api } from './components/api';
import { Section } from './components/Section';
import { UserInfo } from './components/UserInfo';
import { Card } from './components/Card';

import { PopupWithForm } from './components/PopupWithForm';
import { PopupWithImage } from './components/PopupWithImage.js';
import { FormValidator } from './components/FormValidator';

//import { popupAvatarEditForm } from './components/utils';

const selector = '.element-template';
// console.log(selector);

export let userId = 0;


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
//const popupCardImgFullSize = document.querySelector('.img-popup');

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

const userinfo = new UserInfo({ nameSelector: '.profile__name', activitySelector: '.profile__activity' })

const createCard = (cardData) => {
    const userData = userinfo.getUserInfo();
    //console.log(userData);
    const card = new Card(cardData, selector, userData.id, handleLikeCard, handleClickDelete, handleClickCard).createCard();
    return card;
}

const popupCardImgFullSize = new PopupWithImage('.img-popup');
//console.log(popupCardImgFullSize);
popupCardImgFullSize.setEventListeners();

function handleLikeCard(card) {
    console.log(card);
    if (!card.checkLikes()) {
        api.likeCard(card.cardId)
            .then(data => {
                card.likesNumber(data.likes);
                card.toggleLikeBtn();

            })
            .catch(err => console.log(err))
    } else {
        api.unlikeCard(card.cardId)
            .then(data => {
                card.likesNumber(data.likes);
                card.toggleLikeBtn();

            })
            .catch(err => console.log(err))
    }
};

function handleClickCard(name, link){
    //console.log(name);
    popupCardImgFullSize.openPopup(name, link);
}
const handleClickDelete = (card) => {
    api.deleteCard(card.cardId)
        .then(() => {
            card.deleteCard();
        })
        .catch((error) => { console.log(error) });
}

Promise.all([api.getProfileInfo(), api.getAllCards()])
    .then(([user, cards]) => {
        userId = user._id
        userinfo.setUserInfo({ name: user.name, activity: user.about, userId: user._id });
        userinfo.setUserAvatar({ avatar: user.avatar });
        /*newNameFormProfile.textContent = user.name;
        newActivityFormProfile.textContent = user.about;
        newAvatarFormProfile.src = user.avatar;
        inputNameFormProfile.value = user.name;
        inputJobFormProfile.value = user.about;*/
        section.renderItems(cards);
        //cards.forEach((card) => {containerCards.append(createCard(card))})
    })
    .catch((error) => { console.log(error) });



function makeProfileEditForm() {
  popupProfileEditForm.open();
  const userData = userinfo.getUserInfo();
  inputNameFormProfile.value = userData.name;
  inputJobFormProfile.value = userData.activity;
}

//enableValidation(settings);

const popupCardAddForm = new PopupWithForm('.add-popup', (data) => {
  setStatusButton({ buttonElement: submitButtonCard, text: 'Сохранение...', disabled: true });
  console.log(data);
  const newCardData = {
      name: data.name,
      link: data.url,
  }
  api.addCard(newCardData)
      .then((dataCard) => {
          section.addItem(card);
          containerCards.prepend(createCard(dataCard));
          popupCardAddForm.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
          setStatusButton({ buttonElement: submitButtonCard, text: 'Создать', disabled: false });
        });
})

popupCardAddForm.setEventListeners();

const popupProfileEditForm = new PopupWithForm('.profile-popup', (data) => {
    setStatusButton({ buttonElement: submitButtonProfile, text: 'Сохранение...', disabled: true });
    console.log(data);
    api.editProfile({ name: data.name, about: data.activity })
        .then(updateProfile => {
            userinfo.setUserInfo({ name: updateProfile.name, activity: updateProfile.about });
            //newNameFormProfile.textContent = updateProfile.name;
            //newActivityFormProfile.textContent = updateProfile.about;
            popupProfileEditForm.close();
        })
        .catch((error) => { console.log(error) })
        .finally(() => {
            setStatusButton({ buttonElement: submitButtonProfile, text: 'Сохранить', disabled: false });
        });
})

popupProfileEditForm.setEventListeners();

const popupAvatarEditForm = new PopupWithForm('.avatar-popup', (data) => {
    console.log(data.url);
    setStatusButton({ buttonElement: submitButtonAvatar, text: 'Сохранение...', disabled: true });
    api.editAvatar({avatar: data.url})
        .then(updateAvatar => {
            userinfo.setUserAvatar(updateAvatar);

            popupAvatarEditForm.close();
        })
        .catch((error) => { console.log(error) })
        .finally(() => {
            setStatusButton({ buttonElement: submitButtonAvatar, text: 'Сохранить', disabled: false });
        });
})

popupAvatarEditForm.setEventListeners();

//validation
const validatePopupProfileEditForm = new FormValidator(settings, formProfileEdit);

validatePopupProfileEditForm.enableValidation();

const validatepopupCardAddForm = new FormValidator(settings, formCardAdd);

validatepopupCardAddForm.enableValidation();

const validatePopupAvatarEditForm = new FormValidator(settings, formAvatarEdit);

validatePopupAvatarEditForm.enableValidation();


//listeners
buttonOpenProfileEditForm.addEventListener('click', () => {
    validatePopupProfileEditForm.makeButtonDisabled();
    makeProfileEditForm();
});

buttonCloseProfileEditForm.addEventListener('click', () => {
    popupProfileEditForm.close();
    validatePopupProfileEditForm.clearErrors();
});

buttonOpenCardAddForm.addEventListener('click', () => {
  validatepopupCardAddForm.makeButtonDisabled();
  popupCardAddForm.open();
  formCardAdd.reset();
});

buttonCloseCardAddForm.addEventListener('click', () => {
    popupCardAddForm.close();
    validatepopupCardAddForm.clearErrors();
});

buttonOpenAvatarForm.addEventListener('click', () => {
    validatePopupAvatarEditForm.makeButtonDisabled();
    popupAvatarEditForm.open();
    formAvatarEdit.reset();
})

buttonCloseAvatarEditForm.addEventListener('click', () => {
  popupAvatarEditForm.close();
  validatePopupAvatarEditForm.clearErrors();
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет


buttonCloseImgPopup.addEventListener('click', () => { popupCardImgFullSize.close() });

