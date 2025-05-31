import {openModal} from './modal'


function openImagePopup(cardElement) {
      const popupTypeImage = document.querySelector('.popup_type_image');
      const popupContentContentImage = popupTypeImage.querySelector('.popup__content_content_image');
      
      openModal(popupTypeImage);
      popupContentContentImage.querySelector('.popup__image').src = this.src;
      popupContentContentImage.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;
      popupContentContentImage.querySelector('.popup__image').alt = cardData.name;
};


const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCard, addLike, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });
    
    cardImage.addEventListener('click', () => {
        openImagePopup(cardElement);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        addLike(cardElement);
    });

    return cardElement;
}


function deleteCard(card) {
    card.remove();
}


function addLike (cardElement) {
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    if (!cardLikeButton.classList.contains('card__like-button_is-active')) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }
}


export {createCard, deleteCard, addLike};