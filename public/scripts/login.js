let loginButton = document.getElementById("login")
let id = document.getElementById("id")
let password = document.getElementById("password")

loginButton.addEventListener("click", login);

let message = document.getElementById("message")

function login(event) {
    message.hidden = true
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
        password.value = ""
        id.value = ""
        location.href = 'menu'
        message.hidden = true
    } else {
        message.style.display = "block"
        message.innerHTML = this.response.message
        message.hidden = false
        password.value = ""
    }
}