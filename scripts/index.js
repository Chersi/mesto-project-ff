// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });
    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

function addAllCards(cardsArray) {
    const placesList = document.querySelector('.places__list');
    cardsArray.forEach((cardData) => {
        const cardElement = createCard(cardData, deleteCard);
        placesList.append(cardElement);
    });
}

addAllCards(initialCards);