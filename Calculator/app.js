let input = document.querySelector("#inputBox");

let buttons = document.querySelectorAll(".button");

let str = "";

let arr = Array.from(buttons);

window.addEventListener("keydown", (e) => {
    if(e.key === "1") {
        str += e.key;
        input.value = str;
    } 
    else if(e.key === "2") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "3") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "4") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "5") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "6") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "7") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "8") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "9") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "0") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "=") {
        str = eval(str);
        input.value = str;
    }
    else if(e.key === "c") {
        str = "";
        input.value = "";
    }
    else if(e.key === "b") {
        str = str.substring(0, str.length - 1);
        input.value = str;
    }
    else if(e.key === "+") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "-") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "*") {
        str += e.key;
        input.value = str;
    }
    else if(e.key === "/") {
        str += e.key;
        input.value = str;
    }
    // else{
    //     input.setAttribute("disabled", "");
    // }
});