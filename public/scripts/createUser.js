let createUserButton = document.getElementById("createUser");
let perID = document.getElementById("perID");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let userType = document.getElementById("userType");
let message = document.getElementById("message");


function validate(event) {
    message.hidden = true;
    event.preventDefault();
    
    // Ensure fields are valid and passwords match
    if (perID.value === "" || password.value === "" || confirmPassword.value === "" || userType.value === "") {
        message.style.display = "block"
        message.className = "alert alert-danger mt-4"
        message.innerHTML = "Please fill out all fields.";
        message.hidden = false;
    } else if (password.value !== confirmPassword.value) {
        message.style.display = "block"
        message.className = "alert alert-danger mt-4"
        message.innerHTML = "Passwords do not match.";
        message.hidden = false;
    } else {
        createUser();
    }
}

createUserButton.addEventListener("click", validate);

// Send POST request
function createUser() {
    // setup POST request to server
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", responseHandler);
    userInfo = `newPerID=${perID.value}&newPassword=${password.value}&newUserType=${userType.value}`;
    url = "/create_user";
    xhr.responseType = "json";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(userInfo);
}

// handle server response
function responseHandler() {
    console.log(this);
    if (this.response.success === true) {
        message.style.display = "block";
        message.className = "alert alert-success mt-4";
        message.innerHTML = this.response.message;
        message.hidden = false;
        // then clear the values
        perID.value = "";
        password.value = "";
        confirmPassword.value = "";
    } else {
        message.style.display = "block";
        message.className = "alert alert-danger mt-4";
        message.innerHTML = this.response.message;
        message.hidden = false;
    }
}