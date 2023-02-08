import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onClickSubmit);

function onClickSubmit(e){
  e.preventDefault();
  const{
    elements: {delay, step, amount },
  } = e.currentTarget;
  
 let delayInput = Number(delay.value);
  const stepInput = Number(step.value);
  const amountInput = Number(amount.value);
  let position = 1;
  for(position = 1; position <= amountInput; position += 1){
    const delay = (delayInput += position === 1 ? 0 : stepInput);

    createPromise({position, delay})
    .then(({position, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
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
 
