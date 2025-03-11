let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const resetbtn = document.querySelector("#resetBtn");

// let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame) {
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        let guess = parseInt(userInput.value);
        validateNumber(guess);
    });
}

function validateNumber(guess) {
    if(isNaN(guess)) {
        alert("please enter a valid number");
        userInput.value = "";
    } else if(guess < 1) {
        alert("please enter a number more than 1");
        userInput.value = "";
    } else if(guess > 100) {
        alert("please enter a number less than 100");
        userInput.value = "";
    } else{
        if(numGuess === 11) {
            endGame();
            showMessage(`game is draw random number is ${randomNumber}`);
        } else{
            changes(guess);
            checkWinner(guess);
        }
    }
}

function checkWinner(guess) {
    if(guess === randomNumber) {
        showMessage(`you guessed it right!!`);
    } else if(guess < randomNumber) {
        showMessage(`your number is too loww!!`);
    } else if(guess > randomNumber) {
        showMessage(`your number is too high!!`);
    }
}

function changes(guess) {
    userInput.value = "";
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
    guessSlot.innerHTML += `${guess}, `;
}

function endGame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "");
    playGame = false;
}

function showMessage(message) {
    lowOrHi.innerHTML = `<h1>${message}</h1>`;
}

resetbtn.addEventListener("click", function() {
    playGame = true;
    numGuess = 1;
    userInput.innerHTML = "";
    remaining.innerHTML = 10;
    guessSlot.innerHTML = "";
    userInput.removeAttribute("disabled");
});