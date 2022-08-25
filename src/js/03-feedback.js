import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const formElement = document.querySelector('.feedback-form');
const inputElement = document.querySelector('input');
const textAreaElement = document.querySelector('textarea');

insertSavedData();

formElement.addEventListener(
  'input',
  throttle(setInputDataToLocalStorage, 500)
);

formElement.addEventListener('submit', onFormSubmit);

function setInputDataToLocalStorage(event) {
  formData[event.target.name] = event.target.value;
  const stringifyFormData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifyFormData);
}

function insertSavedData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parsedData = JSON.parse(savedData);

    inputElement.value = parsedData.email;
    textAreaElement.value = parsedData.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(
    `Email: ${inputElement.value}, Message: ${textAreaElement.value}`
  );
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
