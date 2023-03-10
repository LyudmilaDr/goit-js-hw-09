const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

let intervalId = null;
btnStop.disabled = true;

function onClickStart() {
    btnStart.disabled = true;
    btnStop.disabled = false;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    }

function onClickStop() {
    btnStart.disabled = false;
    btnStop.disabled = true;
   clearInterval(intervalId);
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
