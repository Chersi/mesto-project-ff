function closeModalEsc (element) {
    if (event.key === 'Escape') {
        const openedModals = document.querySelector('.popup_is-opened'); 
        closeModal(openedModals)
    };
};


function openModal(element) {
    element.classList.add('popup_is-animated');
        setTimeout(() => {
            element.classList.add('popup_is-opened');
    }, 10);
    document.addEventListener('keydown', closeModalEsc);
};

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
    setTimeout(() => {
        modal.classList.remove('popup_is-animated');
    }, 300);
}

// Получаем массив всех модальных окон
const modals = document.querySelectorAll('.popup'); 

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