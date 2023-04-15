let createButton = document.getElementById("createModule")
let moduleTitle = document.getElementById("moduleTitle")
let moduleDescription = document.getElementById("moduleDescription")
let message = document.getElementById("message")

function validate(event) {
    // prevent submitting the form until validation occurs
    message.hidden = true
    event.preventDefault();
    // make sure required fields have values
    if (moduleTitle.value !== "" && moduleDescription.value !== "") {
        addModule();
    } else {
        message.style.display = "block"
        message.className = "alert alert-danger mt-4"
        message.innerHTML = "Please fill out all required fields.";
        message.hidden = false
    }
}

createButton.addEventListener("click", validate)

function addModule(event) {
    // setup POST request to server
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    query = `moduleTitle=${moduleTitle.value}&moduleDescription=${moduleDescription.value}`
    url = `/add_module`
    xhr.responseType = "json";
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(query)
}

// handle server response
function responseHandler() {
    if (this.response.success === true) {
        message.style.display = "block"
        message.className = "alert alert-success mt-4"
        message.innerHTML = this.response.message;
        message.hidden = false
        // then clear the values
        moduleTitle.value = "";
        moduleDescription.value = "";
    } else {
        message.style.display = "block"
        message.className = "alert alert-danger mt-4"
        message.innerHTML = this.response.message;
        message.hidden = false
    }
}
