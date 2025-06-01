function closeModalEsc (element) {
    if (event.key === 'Escape') {
        const openedModals = document.querySelector('.popup_is-opened'); 
        closeModal(openedModals)
    };
};

function Listenerkeydown (evt) {
    closeModalEsc(evt)
};

function openModal(element) {
    element.classList.add('popup_is-animated');
     setTimeout(() => {
        element.classList.add('popup_is-opened');
    }, 10);
    document.addEventListener('keydown', Listenerkeydown);
};


function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', Listenerkeydown);
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

export {closeModal, openModal, initModals};