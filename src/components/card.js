import {addLikeRequest, deleteLikeRequest, deleteCardRequest} from './api'

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, userId, deleteCard, toggleLike, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    const buttonDelete = cardElement.querySelector('.card__delete-button')
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;

    if(userId === cardData.owner._id) {
        buttonDelete.addEventListener('click', () => {
            deleteCard(cardElement, cardData._id);
        })
    } else {
        buttonDelete.remove()
    };
    
    cardImage.addEventListener('click', () => {
        openImagePopup(cardData);
    });

    if(cardData.likes.some((like) => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
        toggleLike(cardLikeButton, cardData._id, cardLikeCounter);
    });

    return cardElement;
}


/*function deleteCard(card, cardId) {
  return deleteCardRequest(cardId)
    .then((result) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}*/

function toggleLike (evt, cardId, cardLikeCounter) {
    const like = evt.classList.contains("card__like-button_is-active") ? deleteLikeRequest : addLikeRequest;
    like(cardId)
    .then((result) => {
        evt.classList.toggle("card__like-button_is-active")
        cardLikeCounter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}


export {createCard, toggleLike};