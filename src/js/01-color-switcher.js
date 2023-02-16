function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', randomBgColorStart);
stopBtn.addEventListener('click', stopRandomBgColor);

stopBtn.disabled = true;
let timerId = 0;

function randomBgColorStart() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopRandomBgColor() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(timerId);
}
