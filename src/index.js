// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import {createCard, deleteCard, toggleLike} from './components/card'
import {closeModal, openModal, initModals} from './components/modal'
import {enableValidation, validationObj, clearValidation} from './components/validation'
import {userInformation, addAllCards, saveUserInformation, addCard, newAvatar} from './api'

const placesList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector('.popup_type_image');
const popupContentImage = popupTypeImage.querySelector('.popup__content_content_image');
let userId = '';
let userAvatar = "";

//Функция открытия попапа карточки
function openImagePopup(cardElement) {
      openModal(popupTypeImage);
      popupContentImage.querySelector('.popup__image').src = cardElement.querySelector('.card__image').src;
      popupContentImage.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;
      popupContentImage.querySelector('.popup__image').alt = cardElement.querySelector('.card__title').textContent;
};

// Находим форму профиля и инпуты в ней
const formElementProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');

//Находим элементы шапки, куда вставим значения полей
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

// Обработчик кнопки обновления профиля
function submitEditProfileForm (evt) {
    evt.preventDefault(); 
    loading (evt.target, true);

    saveUserInformation({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading (evt.target, false);
    })
}

//Слушатель кнопки обновления профиля
formElementProfile.addEventListener('submit', submitEditProfileForm);

const formElementCreate = document.querySelector('form[name="new-place"]');

// Функция заплнения полей профиля
function fillFormFields () {
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
}

const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');

//Слушатель кнопки открытия профиля
profileEditButton.addEventListener('click', () => {
    fillFormFields();
    clearValidation(popupTypeEdit, validationObj)
    openModal(popupTypeEdit);
});

//Слушатель для функции initModals
document.addEventListener('DOMContentLoaded', initModals);

// Вызываем функцию, которая ищет все формы
enableValidation(validationObj); 

const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

//Слушатель кнопки открытия попапа добаления карточек
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

const nameInputCard = formElementCreate.querySelector('.popup__input_type_card-name');
const linkInputCard = formElementCreate.querySelector('.popup__input_type_url');


// Функция сбора информации для добавления одной карточки
function handleFormSubmitNewCards (evt){
  evt.preventDefault();
  loading (evt.target, true);
  
  addCard({
    name: nameInputCard.value,
    link: linkInputCard.value,
  })
  .then((result) => {
    const cardElement = createCard(result, userId, deleteCard, toggleLike, openImagePopup);
    placesList.prepend(cardElement);
    formElementCreate.reset();
    clearValidation(formElementCreate, validationObj)
    closeModal(popupTypeNewCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
      loading (evt.target, false);
    })
}

//Слушатель кнопки отправки данных новой карточки
formElementCreate.addEventListener('submit', handleFormSubmitNewCards);


const profileImageButton = document.querySelector('.profile__image-button');
const popupNewAvatar = document.querySelector('.popup_new_avatar');
const popupInputAvatar = document.querySelector('.popup__input_avatar');


//Слушатель кнопки открытия редактирования аватара
profileImageButton.addEventListener('click', () => {
    clearValidation(popupNewAvatar, validationObj)
    openModal(popupNewAvatar);
});


const profileImage = document.querySelector('.profile__image')

// Функция сбора информации для редактирования аватара
function handleFormSubmitNewAvatar (evt){
  evt.preventDefault();
  loading (evt.target, true);

  newAvatar({
    avatar: popupInputAvatar.value,
  })
  .then((result) => {
      profileImage.style.backgroundImage = `url(${result.avatar})`;
      closeModal(popupNewAvatar);
    })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
      loading (evt.target, false);
    })
}

const avatar = document.querySelector('form[name="avatar"]');

//Слушатель кнопки отправки новой аватарки
avatar.addEventListener('submit', handleFormSubmitNewAvatar);

//Функция замены текста кнопки при загрузке
function loading (form, status) {
  const button = form.querySelector('.popup__button')
  if(status){
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

// Передаём  промисы методу Promise.all
Promise.all([userInformation(), addAllCards()])
  .then((result) => {
    userId = result[0]._id;
    userAvatar = result[0].avatar;
    profileTitle.textContent = result[0].name;
    profileDescription.textContent = result[0].about;
    profileImage.style.backgroundImage = `url(${userAvatar})`;
    result[1].forEach((cardData) => {
      placesList.append(
        createCard(cardData, userId, deleteCard, toggleLike, openImagePopup)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });