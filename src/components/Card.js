export class Card {
  constructor(cardData, selector, userId, handleLikeCard, handleDeleteCard, handleClickCard) {
      this._selector = selector;
      this._name = cardData.name;
      this._image = cardData.image;
      this._likes = cardData.likes;
      this._likesNumber = cardData.likes.length;
      this._link = cardData.link;
      this._cardId = cardData._id;
      this._userId = userId;
      this._ownerId = cardData.owner._id;
      this._handleDeleteCard = handleDeleteCard;
      this._handleClickCard = handleClickCard;
      this._handleLikeCard = handleLikeCard;
  }
  _
  //копируем шаблон
  _getTemplate() {
    const cardElement = document.querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);

    return cardElement;
  }
  checkLikes() {
    return this._likes.find(like => {
        return like._id === this._userId;
    });
  }

  likesNumber(likes) {
      this._likes = likes;
      this._cardLikeNumber.textContent = likes.length;

  }

  toggleLikeBtn() {
      this._cardLikeButton.classList.toggle("elements__button-like_active");
      //this.likesNumber(likes);
  }

  _cardTrash() {
    //console.log(this._ownerId);
    //console.log(this._userId);
      if (this._ownerId !== this._userId) {
        this._cardDeleteButton.remove();
    }
  }

  deleteCard() {
    //this._card.remove();
    this._card.closest('.elements__item').remove();
  }
  //создание карточки

  createCard() {
      this._card = this._getTemplate();
      this._cardImage = this._card.querySelector('.elements__image');
      this._cardTitle = this._card.querySelector('.elements__title');
      this._cardTitle.textContent = this._name;
      this._cardLikeButton = this._card.querySelector('.elements__button-like');
      this._cardDeleteButton = this._card.querySelector('.elements__button-delete');
      this._cardLikeNumber = this._card.querySelector('.elements__number-like');
      this._cardLikeNumber.textContent = this._likesNumber;
      this._cardImage.alt = this._name;
      this._cardImage.src = this._link;
      //this._card.setAttribute('carddata-id', `${this.id}`);
      //this.likesNumber();
      this._setEventListeners();
      this._cardTrash()
      if (this.checkLikes()) this.toggleLikeBtn();
      return this._card;
  }

  _setEventListeners() {
      this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard(this));
      this._cardLikeButton.addEventListener('click', () => this._handleLikeCard(this));
      this._cardImage.addEventListener('click', () => this._handleClickCard(this._name, this._link));
  }
  //новая карточка

}
