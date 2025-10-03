// let input = document.querySelector("#inputBox");

// let buttons = document.querySelectorAll(".button");

// let str = "";

// let arr = Array.from(buttons);

// arr.forEach((button) => {
//     button.addEventListener("click", (e) => {
//         if(e.target.innerHTML === "AC") {
//             str = "";
//             input.value = str;
//         } else if(e.target.innerHTML === "DEL") {
//             str = str.substring(0, str.length - 1);
//             input.value = str;
//         } else if(e.target.innerHTML === "=") {
//             str = eval(str);
//             input.value = str;
//         }
//         else{
//             str += e.target.innerHTML;
//             input.value = str;
//         }
//     })
// });

$(document).ready(function() {
    let str = "";

    $(".button").click(function() {
        let value = $(this).html();

        if (value === "AC") {
            str = "";
            $("#inputBox").val(str);
        } else if (value === "DEL") {
            str = str.substring(0, str.length - 1);
            $("#inputBox").val(str);
        } else if (value === "=") {
            try {
                str = eval(str).toString();
                $("#inputBox").val(str);
            } catch (err) {
                $("#inputBox").val("Error");
                str = "";
            }
        } else {
            str += value;
            $("#inputBox").val(str);
        }
    });

    $(window).keydown(function(e) {
        const allowedKeys = "0123456789+-*/=";
        const key = e.key;

        if (allowedKeys.includes(key)) {
            if (key === "=") {
                try {
                    str = eval(str);
                    $("#inputBox").val(str).toString();
                } catch {
                    $("#inputBox").val("Error");
                    str = "";
                }
            } else {
                str += key;
                $("#inputBox").val(str);
            }
        } else if (key === "c" || key === "C") {
            str = "";
            $("#inputBox").val(str);
        } else if (key === "b" || key === "Backspace") {
            str = str.toString();
            str = str.substring(0, str.length - 1);
            $("#inputBox").val(str);
        }
    });
});