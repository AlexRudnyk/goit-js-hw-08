import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formElement = document.querySelector('.feedback-form');

insertSavedData();

formElement.addEventListener(
  'input',
  throttle(setInputDataToLocalStorage, 500)
);

formElement.addEventListener('submit', onFormSubmit);

function setInputDataToLocalStorage() {
  const formData = {
    email: formElement.elements.email.value,
    message: formElement.elements.message.value,
  };
  const stringifyFormData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifyFormData);
}

function insertSavedData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parsedData = JSON.parse(savedData);

    formElement.elements.email.value = parsedData.email || '';
    formElement.elements.message.value = parsedData.message || '';
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  const result = localStorage.getItem(STORAGE_KEY);
  const parsedResult = JSON.parse(result);
  console.log(parsedResult);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
