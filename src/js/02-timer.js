import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('input');
const buttonStart = document.querySelector('button');
const clockface = document.querySelector('.timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < this.defaultDate) {
      window.alert('Please choose a date in the future');
      buttonStart.setAttribute('disabled', true);
    }
    buttonStart.removeAttribute('disabled');
  },
};

flatpickr(input, options);

const timer = {
  intervalId: null,

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = convertMs(deltaTime);
      updateClockface(time);
    }, 100);
  },
};

function updateClockface({ days, hours, minutes, seconds }) {
  clockface.textContent = `${days} ${hours} ${minutes} ${seconds} `;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
