let startBtn = document.querySelector("#startBtn");

let stopBtn = document.querySelector("#stopBtn");

let resetBtn = document.querySelector("#resetBtn");

let timeDisplay = document.querySelector(".timerDisplay");

let msec = 0;
let secs = 0;
let mins = 0;

let timer = null;

startBtn.addEventListener("click", () => {
    if(timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(showTime, 10);
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timeDisplay.innerHTML = `00 : 00 : 00`;
    mins = 0;
    secs = 0;
    msec = 0;
});

stopBtn.addEventListener("click", () => {
    clearInterval(timer);
});

function showTime() {
    msec++;
    if(msec === 100) {
        msec = 0;
        secs++;
        if(secs === 60) {
            secs = 0;
            mins++;
        }
    }

    let msecString = msec < 10 ? `0${msec}` : msec;
    let secsString = secs < 10 ? `0${secs}` : secs;
    let minsString = mins < 10 ? `0${mins}` : mins;

    timeDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}