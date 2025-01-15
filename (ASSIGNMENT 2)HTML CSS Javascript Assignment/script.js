/*
The Checker class constructor takes in 3 parameters:
1. ele: The input element whose value is to be checked.
2. errorBox: The element where the error message is to be displayed.
3. password: The password input element whose value is to be compared with the value of the current 
input element.

Every Element is assigned to a specific function based on the data-type attribute of the element.
and the function is called whenever the input event is triggered on the element.

The "Corrected" function is called whenever the input is correct or incorrect. 
It changes the outline of the input element to green if the input is correct and red if the input 
is incorrect.
*/

let allCheckers = {
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
};

class Check {
  constructor(ele, errorBox, password = null) {
    this.ele = ele;
    this.errorBox = errorBox;
    this.password = password;
    console.log(this.ele.dataset);
    if (this.ele.dataset.type == "username") {
      ele.addEventListener("input", this.checkUsername.bind(this));
    } else if (this.ele.dataset.type == "email") {
      ele.addEventListener("input", this.checkEmail.bind(this));
    } else if (this.ele.dataset.type == "password") {
      ele.addEventListener("input", this.checkPassword.bind(this));
    } else if (this.ele.dataset.type == "confirmPassword") {
      ele.addEventListener("input", this.checkConfirmPassword.bind(this));
    }
  }
  checkUsername() {
    let value = this.ele.value;
    if (value.length == 0) {
      this.errorBox.innerHTML = "Username cannot be empty";
    } else if (value.length < 3) {
      this.errorBox.innerHTML = "Username must be at least 3 characters long";
    } else if (value.length > 25) {
      this.errorBox.innerHTML = "Username must be less than 25 characters long";
    } else {
      this.errorBox.innerHTML = "";
      this.Corrected(true);
    }
    if (this.errorBox.innerHTML != "") {
      this.Corrected(false);
    }
  }
  checkEmail() {
    let value = this.ele.value;
    if (value.length == 0) {
      this.errorBox.innerHTML = "Email is mandatory";
    } else if (value.includes("@") == false) {
      this.errorBox.innerHTML = "Invalid Email address";
    } else if (value.includes(".") == false) {
      this.errorBox.innerHTML = "Invalid Email address";
    } else if (
      value.lastIndexOf(".") < value.indexOf("@") ||
      (value.lastIndexOf(".") != value.length - 3 &&
        value.lastIndexOf(".") != value.length - 4)
    ) {
      this.errorBox.innerHTML = "Invalid Email address";
    } else {
      this.errorBox.innerHTML = "";
      this.Corrected(true);
    }
    if (this.errorBox.innerHTML != "") {
      this.Corrected(false);
    }
  }
  checkPassword() {
    let value = this.ele.value;
    let upperCaseRegex = /[A-Z]/;
    let lowerCaseRegex = /[a-z]/;
    let numberRegex = /[0-9]/;
    let specialCharacterRegex = /[!@#\$%\^&\*]/;
    if (value.length == 0) {
      this.errorBox.innerHTML = "Password cannot be empty";
    } else if (value.length < 8) {
      this.errorBox.innerHTML = "Password must be at least 8 characters long";
    } else if (upperCaseRegex.test(value) == false) {
      this.errorBox.innerHTML =
        "Password must contain at least one uppercase letter";
    } else if (lowerCaseRegex.test(value) == false) {
      this.errorBox.innerHTML =
        "Password must contain at least one lowercase letter";
    } else if (numberRegex.test(value) == false) {
      this.errorBox.innerHTML = "Password must contain at least one number";
    } else if (specialCharacterRegex.test(value) == false) {
      this.errorBox.innerHTML =
        "Password must contain at least one special character";
    } else {
      this.errorBox.innerHTML = "";
      this.Corrected(true);
    }
    if (this.errorBox.innerHTML != "") {
      this.Corrected(false);
    }
  }
  checkConfirmPassword() {
    let value = this.ele.value;
    console.log(this.password.value);
    if (value.length == 0) {
      this.errorBox.innerHTML = "Password cannot be empty";
    } else if (value != password.value) {
      this.errorBox.innerHTML = "Passwords do not match";
    } else {
      this.errorBox.innerHTML = "";
      this.Corrected(true);
    }
    if (this.errorBox.innerHTML != "") {
      this.Corrected(false);
    }
  }

  Corrected(isCorrect) {
    if (isCorrect) {
      allCheckers[this.ele.dataset.type] = true;
      this.ele.style.outline = "2px solid green";
      this.ele.style.border = "none";
    } else {
      allCheckers[this.ele.dataset.type] = false;
      this.ele.style.outline = "2px solid red";
      this.ele.style.border = "none";
    }
  }
}

let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let eye1 = document.getElementById("eye1");
let eye2 = document.getElementById("eye2");
let success = document.getElementById("success");
let container = document.getElementById("container");

let usernameError = document.getElementById("usernameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let confirmPasswordError = document.getElementById("confirmPasswordError");

let usernameChecker = new Check(username, usernameError);
let emailChecker = new Check(email, emailError);
let passwordChecker = new Check(password, passwordError);
let confirmPasswordChecker = new Check(
  confirmPassword,
  confirmPasswordError,
  password
);

eye1.addEventListener("click", function () {
  if (password.type == "password") {
    password.type = "text";
    eye1.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    password.type = "password";
    eye1.innerHTML = '<i class="fas fa-eye"></i>';
  }
});

eye2.addEventListener("click", function () {
  if (confirmPassword.type == "password") {
    confirmPassword.type = "text";
    eye2.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    confirmPassword.type = "password";
    eye2.innerHTML = '<i class="fas fa-eye"></i>';
  }
});

ButtonHandler = () => {
  if (
    allCheckers.username &&
    allCheckers.email &&
    allCheckers.password &&
    allCheckers.confirmPassword
  ) {
    success.style.display = "flex";
    container.style.filter = "blur(5px)";
    success.classList.add("correct");
  } else {
    success.innerHTML = "Form Submission Failed!";
    success.style.display = "flex";
    container.style.filter = "blur(5px)";
    success.classList.add("incorrect");
  }
};
