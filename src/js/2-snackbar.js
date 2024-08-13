// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const mainForm = document.querySelector('form');
const startButton = document.querySelector('button');

mainForm.addEventListener('submit', event => {
    event.preventDefault();

    const userTime = Number(mainForm.delay.value);
    const stateButton = mainForm.querySelector('input[name="state"]:checked');
    const userStateButton = stateButton.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userStateButton === 'fulfilled') {
                resolve(userTime);
            } else {
                reject(userTime);
            }
        }, userTime);
    });

    promise.then(function(delay) {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            fontSize: 'large',
            close: true,
            position: 'topRight',
            messageColor: 'white',
            timeout: 2500,
            icon: false,
        });
    }).catch(function(delay) {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            fontSize: 'large',
            close: true,
            position: 'topRight',
            messageColor: 'white',
            timeout: 2500,
            icon: false,
        });
    });

    mainForm.reset();

});
