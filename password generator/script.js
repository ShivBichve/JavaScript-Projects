let slider = document.querySelector("#inputSlider");
let slidervalue = document.querySelector("#sliderValue");
let passbox = document.querySelector("#passBox");
let genBtn = document.querySelector("#genBtn");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let copyIcon = document.getElementById("copyIcon");

slidervalue.innerHTML = slider.value;

slider.addEventListener("input", (e) => {
    slidervalue.innerHTML = slider.value;
});

genBtn.addEventListener("click", (e) => {
    passbox.value = generatePassword();
});

function generatePassword() {
    let allUppercase = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
    let allLowercase = "abcdefghijklmnopqrstuvwxyz";
    let allNumbers = "0123456789";
    let allSymbols = "~!@#$%^&*";
    let allChars = "";
    let genPass = "";

    // allChars += uppercase.checked ? allUppercase : "";
    // allChars += lowercase.checked ? allLowercase : "";
    // allChars += numbers.checked ? allNumbers : "";
    // allChars += symbols.checked ? allSymbols : "";

    if (uppercase.checked) {
        allChars += allUppercase;
    } else{
        allChars += "";
    }
    if (lowercase.checked) {
        allChars += allLowercase;
    }else{
        allChars += "";
    }
    if (numbers.checked) {
        allChars += allNumbers;
    }else{
        allChars += "";
    }
    if (symbols.checked) {
        allChars += allSymbols;
    }else{
        allChars += "";
    }

    for (i = 0; i < slidervalue.innerHTML; i++) {
        genPass += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return genPass;
}

copyIcon.addEventListener("click", () => {
    if(passbox.value != "" || passbox.value.length >= 1) {
        navigator.clipboard.writeText(passbox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";
    }
});