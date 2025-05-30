const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


function createCard(cardData, deleteCard, addLike) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });
    

  cardElement.querySelector('.card__image').addEventListener('click', function(evt) {
      const popupTypeImage = document.querySelector('.popup_type_image');
      const popupContentContentImage = popupTypeImage.querySelector('.popup__content_content_image');
        
      popupTypeImage.classList.add('popup_is-opened', 'popup_is-animated');
      popupContentContentImage.querySelector('.popup__image').src = this.src;
      popupContentContentImage.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        addLike(cardElement);
    });

    return cardElement;
}


function addAllCards(cardsArray) {
    const placesList = document.querySelector('.places__list');
    cardsArray.forEach((cardData) => {
        const cardElement = createCard(cardData, deleteCard, addLike);
        placesList.append(cardElement);
    });
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


let allCards = [];


function createNewCard (name, url) {
    const newObj = {
      name: name,
      link: url,
    };

    allCards.push(newObj);

    const lastCard = allCards[allCards.length - 1];
    addSingleCard(lastCard);
}

// Функция для добавления одной карточки
function addSingleCard(cardData) {
    const placesList = document.querySelector('.places__list');
    const cardElement = createCard(cardData, deleteCard, addLike);
    placesList.prepend(cardElement);
}    

export {initialCards, createCard, deleteCard, addAllCards, addLike, allCards, createNewCard, addSingleCard};