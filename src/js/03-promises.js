import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[ name="step"]');
const amount = document.querySelector('[ name="amount"]');

form.addEventListener('submit', onClickSubmit);
function onClickSubmit(e){
  e.preventDefault();
  const delay = Number(form.element.delay.value);
  const step = Number(form.element.step.value);
  const amount = form.element.delay.value;
  let position = 1;
  for(position = 1; position <= amount; position += 1){
    createPromise(position, delay)
    .then(({position, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      if (shouldResolve) {
        resolve({position, delay});
      }else {
        reject({position, delay});
      }  
    }, delay);
  });
  
  } 
 
