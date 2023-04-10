let createButton = document.getElementById("createModule")
let moduleID = document.getElementById("moduleID")
let moduleTitle = document.getElementById("moduleTitle")
let moduleDescription = document.getElementById("moduleDescription")
let message = document.getElementById("message")

function validate(event) {
    // prevent submitting the form until validation occurs
    message.style.display = "hidden"
    event.preventDefault();
    // make sure required fields have values
    if (moduleID.value !== "" && moduleTitle.value !== "" && moduleDescription.value !== "") {
        addModule();
    } else {
        message.style.display = "block"
        message.className = "alert alert-danger mt-4"
        message.innerText = "Please fill out all required fields.";
    }
}

createButton.addEventListener("click", validate)

function addModule(event) {
    // setup POST request to server
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    query = `moduleID=${moduleID.value}&moduleTitle=${moduleTitle.value}&moduleDescription=${moduleDescription.value}`
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
        message.innerText = this.response.message;
        // then clear the values
        moduleID.value = "";
        moduleTitle.value = "";
        moduleDescription.value = "";
    } else {
        message.style.display = "block"
        message.className = "alert alert-danger mt-4"
        message.innerText = this.response.message;
    }
}
