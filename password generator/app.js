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

slider.addEventListener('input', () => {
    slidervalue.innerHTML = slider.value;
});

genBtn.addEventListener('click', () => {
    passbox.value = generatePassword();
});

function generatePassword() {
    let allUppercase = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
    let allLowercase = "abcdefghijklmnopqrstuvwxyz";
    let allNumbers = "0123456789";
    let allSymbols = "~!@#$%^&*";
    let allChars = "";
    let genPass = "";

    uppercase.checked ? allChars += allUppercase : '';
    lowercase.checked ? allChars += allLowercase : '';
    numbers.checked ? allChars += allNumbers : '';
    symbols.checked ? allChars += allSymbols : '';

    for(let i = 0; i < slidervalue.innerHTML; i++) {
        genPass += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return genPass;
}