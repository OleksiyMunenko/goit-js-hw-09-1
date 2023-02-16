import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const valueEl = document.querySelectorAll('.value');

let selectedDate = 0;
let timerId = 0;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};

startBtn.addEventListener('click', startTimer);

function startTimer() {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    if (selectedDate - Date.now() > 0) {
      valueEl[0].textContent = `${days}`;
      valueEl[1].textContent = `${hours}`;
      valueEl[2].textContent = `${minutes}`;
      valueEl[3].textContent = `${seconds}`;
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
      return;
    }
    Notiflix.Report.success('Game over');
    clearInterval(timerId);
  }, 1000);
}
flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart('2', 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
