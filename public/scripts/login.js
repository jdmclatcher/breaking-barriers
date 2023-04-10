let loginButton = document.getElementById("login")
let id = document.getElementById("id")
let password = document.getElementById("password")

loginButton.addEventListener("click", login);

let message = document.getElementById("message")

function login(event) {
    event.preventDefault()
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    query=`id=${id.value}&password=${password.value}`
    url = `/login`
    xhr.responseType = "json"
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(query)
}

function responseHandler() {
    if (this.response.success) {
        password.value = "";
        id.value = "";
        location.href = 'menu'
    } else {
        message.style.display = "block"
        message.innerText = this.response.message
        password.value = ""
    }
}