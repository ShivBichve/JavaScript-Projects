let time = document.querySelector(".time");

function setTime() {
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    let newHours = hours < 10 ? `0${hours}` : hours;
    let newMins = mins < 10 ? `0${mins}` : mins;
    let newSecs = secs < 10 ? `0${secs}` : secs;

    time.innerHTML = `${newHours} : ${newMins} : ${newSecs}`;
}

setInterval(setTime, 1000);