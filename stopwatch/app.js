let startBtn = document.querySelector("#startBtn");

let stopBtn = document.querySelector("#stopBtn");

let resetBtn = document.querySelector("#resetBtn");

let timeDisplay = document.querySelector(".timerDisplay");

let secs = 0;
let minsecs = 0;
let mins = 0;

let timer = null;

startBtn.addEventListener('click', () => {
    if (timer !== null) {
        clearInterval(timer)
    }
    timer = setInterval(startTime, 10);
});

function startTime() {
    minsecs++;
    if (minsecs === 100) {
        minsecs = 0;
        secs++;
        if (secs === 60) {
            secs = 0;
            mins++;
        }
    }

    let minsecsString = minsecs < 10 ? `0${minsecs}` : minsecs;
    let secsString = secs < 10 ? `0${secs}` : secs;
    let minsString = mins < 10 ? `0${mins}` : mins;

    timeDisplay.innerHTML = `${minsString} : ${secsString} : ${minsecsString}`
}

stopBtn.addEventListener('click', () => {
    clearInterval(timer);
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    secs = 0;
    minsecs = 0;
    mins = 0;
    timeDisplay.innerHTML = `00 : 00 : 00`;
});