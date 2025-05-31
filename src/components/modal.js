function closeModalEsc (element) {
    if (event.key === 'Escape') {
        closeModal(element)
    };
};

let keydownHandler;

function openModal(element) {
    element.classList.add('popup_is-animated');
     setTimeout(() => {
        element.classList.add('popup_is-opened');
    }, 10);
     keydownHandler = () => {
        closeModalEsc(element);
    };
    document.addEventListener('keydown', keydownHandler);
};

const formElementCreate = document.querySelector('form[name="new-place"]');
const nameInputCreate = formElementCreate.querySelector('.popup__input_type_card-name');
const urlInputCreate = formElementCreate.querySelector('.popup__input_type_url');

function clearFormFields() {
    nameInputCreate.value = '';
    urlInputCreate.value = '';
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keydownHandler);
        clearFormFields();

    setTimeout(() => {
        modal.classList.remove('popup_is-animated');
    }, 300);
}



const modals = document.querySelectorAll('.popup');  // Получаем массив всех модальных окон 

function initModals() {
    modals.forEach((modal) => {
        modal.addEventListener('click', (event)  => {
            if(event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) { // так мы проверим, что юзер кликнул на кнопку или оверлей
                closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
            }
        })
    })
};

export {closeModal, openModal, initModals, clearFormFields};