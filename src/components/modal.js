import {nameInputCreate, urlInputCreate, modals} from '../index'
import {createNewCard} from '../components/cards'

function openModals(element) {
    element.classList.add('popup_is-opened', 'popup_is-animated');
};


function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

function closeModalEsc () {
    if (event.key === 'Escape') {
        // Получаем все открытые модальные окна
        const openedModals = document.querySelectorAll('.popup_is-opened');
            
        // Закрываем каждое открытое окно
        openedModals.forEach((modal) => {
            closeModal(modal);
        });
    }
};


function handleFormSubmitNewCards (evt){
    evt.preventDefault();

    const name = nameInputCreate.value;
    const url = urlInputCreate.value;

    if (name && url) {
        createNewCard(name, url);
        // Очищаем поля формы после добавления
        nameInputCreate.value = '';
        urlInputCreate.value = '';

        const openedModals = document.querySelectorAll('.popup_is-opened');
        
        // Закрываем каждое открытое окно
        openedModals.forEach((modal) => {
            closeModal(modal);
        });
    }
}


function initModals() {
    modals.forEach((modal) => {
        modal.addEventListener('click', (event)  => {
            if(event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) { // так мы проверим, что юзер кликнул на кнопку или оверлей
                closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
            }
        })
    })
};

export {closeModal, handleFormSubmitNewCards, openModals, closeModalEsc, initModals};