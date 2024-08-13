// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSector = document.querySelector('[data-days]');
const hoursSector = document.querySelector('[data-hours]');
const minutesSector = document.querySelector('[data-minutes]');
const secondsSector = document.querySelector('[data-seconds]');

let userDate;
let countInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < options.defaultDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
      startButton.classList.remove('is-active');
    } else {
      startButton.disabled = false;
      startButton.classList.add('is-active');
      userDate = selectedDate;
    };
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  startButton.classList.remove('is-active');
  input.disabled = true;
  startTimer();
});

function startTimer() {
  const finishDate = userDate.getTime();
  countInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const restTime = finishDate - currentDate;
    if (restTime <= 0) {
      clearInterval(countInterval);
      daysSector.textContent = '00';
      hoursSector.textContent = '00';
      minutesSector.textContent = '00';
      secondsSector.textContent = '00';
      startButton.disabled = false;
      input.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(restTime);
      daysSector.textContent = addLeadingZero(days);
      hoursSector.textContent = addLeadingZero(hours);
      minutesSector.textContent = addLeadingZero(minutes);
      secondsSector.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}






