import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate = null;
btnStart.disabled = true;
btnStart.addEventListener('click', onClickStart);

// вибір дати


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if(selectedDate < options.defaultDate){
            Notiflix.Notify.failure(`Please choose a date in the future`);
        } else {
            btnStart.disabled = false;   
        }
    },
  };

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
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value){
    const { days, hours, minutes, seconds} = value;
    days.textContent = `${days.toString().padStart(2, '0')}`;
    hours.textContent = `${hours.toString().padStart(2, '0')}`;
    minutes.textContent = `${minutes.toString().padStart(2, '0')}`;
    seconds.textContent = `${seconds.toString().padStart(2, '0')}`;
}
function onClickStart(){
    btnStart.disabled = true;
    const intervalId = setInterval(() =>{
        const defaultDate = Date.now();
        let timer = defaultDate - selectedDate;
        // console.log(timer)
        const timerDate = convertMs(timer);
        addLeadingZero(timerDate);

        if(timerDate <= 0){
            clearInterval(intervalId);
        }
    }, 1000);
}
flatpickr(inputDate, options);