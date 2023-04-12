let createUserButton = document.getElementById("createUser");
let perID = document.getElementById("perID");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let errorMessage = document.getElementById("errors");


function validate(event) {
    errorMessage.hidden = true;
    event.preventDefault();
    
    // Ensure fields are valid and passwords match
    if (perID.value === "" || password.value === "" || confirmPassword.value === "") {
        errorMessage.style.display = "block"
        errorMessage.className = "alert alert-danger mt-4"
        errorMessage.innerHTML = "Please fill out all fields.";
        errorMessage.hidden = false;
    } else if (password.value !== confirmPassword.value) {
        errorMessage.style.display = "block"
        errorMessage.className = "alert alert-danger mt-4"
        errorMessage.innerHTML = "Passwords do not match.";
        errorMessage.hidden = false;
    } else {
        createUserButton();
    }
}

createUserButton.addEventListener("click", validate);

