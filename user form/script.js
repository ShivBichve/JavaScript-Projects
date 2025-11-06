//  <script>
//     $(document).ready(function () {
//       document.getElementById("myForm").addEventListener("submit", function (e) {
//         e.preventDefault();
//         $(".error").text("");
        
//         let valid = true;
        
//         let name = document.getElementById("name").value.trim();
//         let email = document.getElementById("email").value.trim();
//         let password = document.getElementById("password").value;
//         let phone = document.getElementById("phone").value.trim();
//         // let gender = $("input[name='gender']:checked").val();
//         let gender = document.querySelector("input[name='gender']:checked")?.value;
//         // console.log(gender)
//         let country = document.getElementById("country").value;
//         let dob = document.getElementById("dob").value;
//         let message = document.getElementById("message").value.trim();
//         let nameError = document.getElementById("nameError");

//         if (name === "") {
//           nameError.innerHTML = "Please enter your name";
//           valid = false;
//           return;
//         }

//         let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
//         if (email === "") {
//           document.getElementById("emailError").innerHTML = "Please enter your email";
//           valid = false;
//           return;
//         } else if (!emailPattern.test(email)) {
//           document.getElementById("emailError").innerHTML = "Enter a valid email address";
//           valid = false;
//           return;
//         }

//         let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

//         if (password === "") {
//             document.getElementById("passwordError").innerHTML = "Please enter your password";
//             valid = false;
//             return;
//         } else if (!passwordPattern.test(password)) {
//             document.getElementById("passwordError").innerHTML = 
//                 "Password must have at least 1 uppercase, 1 lowercase, 1 special character, and be 8+ characters long";
//             valid = false;
//             return;
//         }

//         let phonePattern = /^[0-9]{10}$/;
//         if (!phonePattern.test(phone)) {
//           document.getElementById("phoneError").innerHTML = "Enter a valid 10-digit phone number";
//           valid = false;
//           return;
//         }

//         if (!gender) {
//           document.getElementById("genderError").innerHTML = "Please select gender";
//           valid = false;
//           return;
//         }

//         if (country === "") {
//           document.getElementById("countryError").innerHTML = "Please select a country";
//           valid = false;
//           return;
//         }

//         // DOB validation

//         if (dob === "") {
//             document.getElementById("dobError").innerHTML = "Please select your date of birth";
//             valid = false;
//             return;
//         } else {
//             let selectedDate = new Date(dob);
//             let today = new Date();

//             // Remove time part from today's date for comparison
//             today.setHours(0, 0, 0, 0);

//             if (selectedDate >= today) {
//                 document.getElementById("dobError").innerHTML = "Date of birth must be earlier than today";
//                 valid = false;
//                 return;
//             }
//         }

//         // if (dob === "") {
//         //   $("#dobError").text("Please select your date of birth");
//         //   valid = false;
//         //   return;
//         // }

//         if (message === "") {
//           document.getElementById("messageError").innerHTML = "Please enter a message";
//           valid = false;
//           return;
//         }

//         if (valid) {
//           alert("Form submitted successfully!");
//           document.getElementById("myForm").reset();
//         }
//       });
//     });
//   </script> 