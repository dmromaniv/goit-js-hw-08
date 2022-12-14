import throttle from 'lodash/throttle';

const formRef = document.querySelector('.feedback-form');

window.addEventListener('load', initForm);
formRef.addEventListener('input', throttle(getFormData, 500));
formRef.addEventListener('submit', clearStorage);

// Get data from form inputs
function getFormData() {
  const { email, message } = this.elements;
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (emailValue && messageValue) {
    const savedData = {
      [email.name]: emailValue,
      [message.name]: messageValue,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(savedData));
  }
}
// Clear localStorage and log data in console
function clearStorage(event) {
  event.preventDefault();
  try {
    const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (savedData) console.log(savedData);
    formRef.reset();
  } catch (error) {
    console.log('Can`t parce this data: ' + error.name); // "SyntaxError"
  }

  localStorage.removeItem('feedback-form-state');
}

function initForm() {
  if (localStorage.getItem('feedback-form-state')) {
    const { email, message } = formRef.elements;
    try {
      const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
      email.value = savedData.email;
      message.value = savedData.message;
    } catch (error) {
      console.log('Can`t parce this data: ' + error.name); // "SyntaxError"
    }
  }
}
