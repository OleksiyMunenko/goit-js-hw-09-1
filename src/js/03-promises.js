import Notiflix from "notiflix";
 

const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name="delay"]');
const delayStepp = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const submitBtn = document.querySelector('button');




submitBtn.addEventListener('click', onSubmit);

function onSubmit(e) {
	e.preventDefault();
	const numOfCreatedPromise = parseInt(amount.value);
  const step = parseInt(delayStepp.value);
  let delay = parseInt(firstDelay.value);
	
	for (let position = 1; position <= numOfCreatedPromise; position += 1) {
		createPromise( position, delay ).then(({ position, delay }) => {
			return Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
		}).catch(({ position, delay }) => {
			return Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
		})
		delay += step;
	}
}


function createPromise(position, delay) {
	const shouldResolve = Math.random() > 0.3;

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
			// Fulfill
				resolve({ position, delay });
			} else {
			// Reject
				reject({ position, delay });
			}
		}, delay)
	})
  
}
