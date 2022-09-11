import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', onFormSubmit);
email.addEventListener('input', throttle(onEmailInput, 500));
message.addEventListener('input', throttle(onMessageInput, 500));

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

populateTextarea();

form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
});
// Отслеживай на форме событие input, и каждый раз записывай в локальное
// хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы.
function onMessageInput(e) {
  const value = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onEmailInput(e) {
  const value = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// При сабмите формы очищай хранилище и поля формы,
// а также выводи объект с полями email, message и текущими их значениями в консоль.
function onFormSubmit(e) {
  e.preventDefault();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные,
// заполняй ими поля формы. В противном случае поля должны быть пустыми.
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const parseForm = JSON.parse(savedMessage);
    message.value = parseForm.message || '';
    email.value = parseForm.email || '';
  }
}


