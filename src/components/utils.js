const urlValueImg =  document.querySelector('.img-popup__image');
const textValueImg = document.querySelector('.img-popup__title');

function setImgValue(evt) {
    urlValueImg.src = evt.target.src;
    urlValueImg.alt = evt.target.alt;
    textValueImg.textContent = evt.target.alt;
}

export default setImgValue;