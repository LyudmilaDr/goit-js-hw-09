import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timerEl = document.querySelector('.timer');
const fieldEl = document.querySelector('.field');


btnStart.disabled = true;
btnStart.addEventListener('click', onClickStart);
let selectedDate;
let objDate = {};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();
        if(selectedDate < new Date().getTime()){
            Notiflix.Notify.failure(`Please choose a date in the future`);
            btnStart.disabled = true;
        } else {
            btnStart.disabled = false;   
        }
    },
  };
  flatpickr(inputDate, options);

function convertMs(ms) {
   
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
  
    objDate = { days, hours, minutes, seconds };
    return  objDate;
  }
  


function addLeadingZero(value){
   return value.padStart(2,'0');
}
function onClickStart(){
    const intervalId = setInterval(() =>{
        let timer = selectedDate - new Date;
        if(timer <= 0){
            clearInterval(intervalId);
            return
        }
        btnStart.disabled = true
        const timerDate = convertMs(timer);

       
        daysEl.textContent =  addLeadingZero(`${objDate.days}`);
        hoursEl.textContent =  addLeadingZero(`${objDate.hours}`);
        minutesEl.textContent =  addLeadingZero(`${objDate.minutes}`);
        secondsEl.textContent =  addLeadingZero(`${objDate.seconds}`);
    }, 1000);
}