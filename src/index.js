// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import {initialCards, createCard, deleteCard, addAllCards, addLike, allCards, createNewCard, addSingleCard} from './components/cards'
import {closeModal, handleFormSubmitNewCards, openModals, closeModalEsc, initModals} from './components/modal'

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
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInputDescriptionValue.value
    profileDescription.textContent = jobInputDescriptionValue.value

    const openedModals = document.querySelectorAll('.popup_is-opened');
        
    // Закрываем каждое открытое окно
    openedModals.forEach((modal) => {
        closeModal(modal);
    });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementDescription.addEventListener('submit', handleFormSubmit);


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
    openModals(popupTypeEdit);
});


const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', () => openModals(popupTypeNewCard));


formElementCreate.addEventListener('submit', handleFormSubmitNewCards);


document.addEventListener('keydown', () => {
    closeModalEsc()
});


const modals = document.querySelectorAll('.popup');  // Получаем массив всех модальных окон 

document.addEventListener('DOMContentLoaded', () => {
    initModals();
});


export {nameInputCreate, urlInputCreate, modals};