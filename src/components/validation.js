// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(validationObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObj.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationObj) => {
    inputElement.setCustomValidity("");
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(validationObj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationObj.errorClass);
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, validationObj) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        inputElement.setCustomValidity("");
  }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationObj);
  } else {
        hideInputError(formElement, inputElement, validationObj);
  }
};

// Функция, которая проверяет валидность всех полей в форме
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Функция, которая ищет все поля формы и вешает на них слушатель
const setEventListener = (formElement, validationObj) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
    const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationObj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationObj)
            toggleButtonState(inputList, buttonElement, validationObj)
        });
    });
};

// Функция, которая ищет все формы
const enableValidation = (validationObj) => {
    const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
    formList.forEach((formElement) => {
        setEventListener(formElement, validationObj);
    });
}

// Функция, которая отвечает ха состояние кнопки
const toggleButtonState = (inputList, buttonElement, validationObj) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationObj.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationObj.inactiveButtonClass);
    }
}


const clearValidation = (formElement, validationObj) => {
    const listErrorSpan = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
    const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);
    listErrorSpan.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationObj);
    });
    toggleButtonState(listErrorSpan, buttonElement, validationObj)
}


export {enableValidation, clearValidation};