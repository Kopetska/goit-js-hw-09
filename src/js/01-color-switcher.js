const CHANGECOLOR_INTERVAL = 1000;

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId = null;

buttonStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, CHANGECOLOR_INTERVAL);
  buttonStart.setAttribute('disabled', true);
});

buttonStop.addEventListener('click', () => {
  clearInterval(intervalId);
  buttonStop.setAttribute('disabled', true);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
