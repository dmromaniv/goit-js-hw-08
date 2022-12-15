import throttle from 'lodash/throttle';

const FORM_STATE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');

window.addEventListener('load', initForm);
formRef.addEventListener('input', throttle(setDataToStorage, 500));
formRef.addEventListener('submit', clearStorage);

// Get data from inputs
function getFormData(elements) {
  const { email, message } = elements;

  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (emailValue && messageValue) {
    const savedData = {
      [email.name]: emailValue,
      [message.name]: messageValue,
    };
    return savedData;
  }
  return null;
}
// Set input data to local storage
function setDataToStorage() {
  const inputData = getFormData(this.elements);

  if (inputData) {
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(inputData));
  }
}
// Clear localStorage and log data in console
function clearStorage(event) {
  event.preventDefault();

  const inputData = getFormData(event.currentTarget.elements);

  if (inputData) console.log(inputData);
  event.currentTarget.reset();
  localStorage.removeItem(FORM_STATE_KEY);
}
// Init form on page load
function initForm() {
  const storedData = localStorage.getItem(FORM_STATE_KEY);
  if (storedData) {
    const { email, message } = formRef.elements;
    try {
      const parsedData = JSON.parse(storedData);
      email.value = parsedData.email;
      message.value = parsedData.message;
    } catch (error) {
      console.log('Can`t parce this data: ' + error.name); // "SyntaxError"
    }
  }
}
