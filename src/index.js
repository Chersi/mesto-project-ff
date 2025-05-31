// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import {initialCards} from './components/cards'
import {createCard, deleteCard, addLike} from './components/card'
import {closeModal, openModal, initModals, clearFormFields} from './components/modal'


function openImagePopup(cardElement) {
      const popupTypeImage = document.querySelector('.popup_type_image');
      const popupContentContentImage = popupTypeImage.querySelector('.popup__content_content_image');
      
      openModal(popupTypeImage);
      popupContentContentImage.querySelector('.popup__image').src = cardElement.querySelector('.card__image').src;
      popupContentContentImage.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;
      popupContentContentImage.querySelector('.popup__image').alt = cardElement.querySelector('.card__title').textContent;
};


function addAllCards(cardsArray) {
    const placesList = document.querySelector('.places__list');
    cardsArray.forEach((cardData) => {
        const cardElement = createCard(cardData, deleteCard, addLike, openImagePopup);
        placesList.append(cardElement);
    });
}


addAllCards(initialCards);


// Находим форму в DOM
const formElementDescription = document.querySelector('form[name="edit-profile"]');
const nameInputDescription = formElementDescription.querySelector('.popup__input_type_name');
const jobInputDescription = formElementDescription.querySelector('.popup__input_type_description');

// Получите значение полей jobInput и nameInput из свойства value
const formElementDescriptionValue = document.forms['edit-profile'];
const nameInputDescriptionValue = formElementDescriptionValue.elements.name;
const jobInputDescriptionValue = formElementDescriptionValue.elements.description;


// Выберите элементы, куда должны быть вставлены значения полей
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfileForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInputDescriptionValue.value
    profileDescription.textContent = jobInputDescriptionValue.value

    closeModal(popupTypeEdit);   
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementDescription.addEventListener('submit', submitEditProfileForm);


const formElementCreate = document.querySelector('form[name="new-place"]');
const nameInputCreate = formElementCreate.querySelector('.popup__input_type_card-name');
const urlInputCreate = formElementCreate.querySelector('.popup__input_type_url');


const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

function fillFormFields () {
    nameInputDescriptionValue.value = profileTitle.textContent
    jobInputDescriptionValue.value = profileDescription.textContent
}

profileEditButton.addEventListener('click', () => {
    fillFormFields();
    openModal(popupTypeEdit);
});


const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));


const placesList = document.querySelector('.places__list');

// Функция для добавления одной карточки
function createAndAddCard(name, url) {
    const newCard = {
        name: name,
        link: url
    };
    
    const cardElement = createCard(newCard, deleteCard, addLike, openImagePopup);
    placesList.prepend(cardElement);
};


function handleFormSubmitNewCards (evt){
    evt.preventDefault();

    const name = nameInputCreate.value;
    const url = urlInputCreate.value;

    if (name && url) {
        createAndAddCard(name, url);
        // Очищаем поля формы после добавления
        clearFormFields();
        closeModal(popupTypeNewCard);
    }
}

formElementCreate.addEventListener('submit', handleFormSubmitNewCards);


document.addEventListener('DOMContentLoaded', () => {
    initModals();
});
