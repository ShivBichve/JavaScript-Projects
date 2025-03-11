let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const resetbtn = document.querySelector("#resetBtn");

let numGuess = 1;

let playGame = true;

if(playGame) {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let userGuess = parseInt(userInput.value);
        validateNumber(userGuess);
    });
}

function validateNumber(userGuess) {
    if(isNaN(userGuess)) {
        alert('please enter a valid number');
        userInput.value = '';
    } else if(userGuess < 1) {
        alert('please enter a number more than 1');
        userInput.value = '';
    } else if(userGuess > 100) {
        alert('please enter a number less than 100');
        userInput.value = '';
    } else {
        checkNumber(userGuess);
        changes(userGuess);
        if(numGuess === 11) {
            showMessage(`game is draw random number is ${randomNumber}`);
            userInput.value = '';
            userInput.setAttribute('disabled', '');
        }
    }
}

function checkNumber(userGuess) {
    if(userGuess === randomNumber) {
        showMessage(`you guessed it rightt`);
    } else if(userGuess < randomNumber) {
        showMessage(`your number is too loww`);
    } else if(userGuess > randomNumber) {
        showMessage(`your number is too highh`);
    }
}

function showMessage(message) {
    lowOrHi.innerHTML = `<h1>${message}</h1>`;
}

function changes(userGuess) {
    userInput.value = '';
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
    guessSlot.innerHTML += `${userGuess}, `;
}