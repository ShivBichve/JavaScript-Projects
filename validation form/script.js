let submitBtn = document.querySelector("#submitBtn");
let nameError = document.querySelector("#nameError");
let emailError = document.querySelector("#emailError");
let passError = document.querySelector("#passError");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(validateName() && validateEmail() && validatePassword()) {
        alert("form submitted");
    }
});

function validateName() {
    let name = document.querySelector("#name").value;

    if(name.length == 0) {
        nameError.innerHTML = "name is required";
        return;
    }
    
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = "please enter full name";
        return;
    }

    nameError.innerHTML = "";

    return true;
}

function validateEmail() {
    let email = document.querySelector("#email").value;

    if(email.length == 0) {
        emailError.innerHTML = "email is required";
        return;
    }
    
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.innerHTML = "enter a valid email";
        return;
    }

    emailError.innerHTML = "";

    return true;
}

function validatePassword() {
    let password = document.querySelector("#password").value;

    if(password.length == 0) {
        passError.innerHTML = "password is required";
        return;
    }
    
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)) {
        passError.innerHTML = "Password should contain 1 Uppercase, 1 Lowecase, 1 Digit & 1 Alphabet";
        return;
    }

    passError.innerHTML = "";

    return true;
}