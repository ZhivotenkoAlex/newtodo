import TextInput from "../elements/textInput.js"
import PasswordInput from "../elements/passwordInput.js"
import Button from "../elements/button.js"

class Login {
  constructor(emitter) {
    this.emitter = emitter
    this.LoginInput = new TextInput()
    this.PasswordInput = new PasswordInput()
    this.Button = new Button()
    this.title = document.createElement("span")
    this.users = []
    this.storage = JSON.parse(localStorage.getItem("storage"))
  }

  checkRepeat = () => {
    const login = this.LoginInput.textInput.value
    // const password = this.PasswordInput.passwordInput.value
    if (this.storage === null) {
      return false
    } else {
      let isUserInStorage = this.storage.find((item) => item.login === login)
      return isUserInStorage ? true : false
    }
  }

  isLoggedIn = () => {
    // e.preventDefault()
    const login = this.LoginInput.textInput.value
    const password = this.PasswordInput.passwordInput.value
    if (!this.storage) {
      return false
    } else {
      let isUserLoggedIn = this.storage.find(
        (item) => item.login === login && item.password === password
      )
      return isUserLoggedIn ? true : false
    }
  }

  register = (e) => {
    // e.preventDefault()

    const user = {
      id: Date.now(),
      login: this.LoginInput.textInput.value,
      password: this.PasswordInput.passwordInput.value,
    }
    this.users.push(user)
    localStorage.setItem("storage", JSON.stringify(this.users))
  }

  authentification = (e) => {
    e.preventDefault()

    const messageNotRegistred =
      "You are not registred yet. Do you want to register with the current data?"
    const messageEmptyFields = "Please, enter your email and password"
    const messageValidateEmail =
      "Please, enter the correct email using the following pattern: xxxx@xxx.xx"
    const messagePasswordLength = `Please lengthen this text to 6 characters or more(you are currently using ${this.PasswordInput.passwordInput.value.length} characters)`

    if (
      this.PasswordInput.passwordInput.value === "" ||
      this.LoginInput.textInput.value === ""
    ) {
      this.emitter.emit("openModal", {
        message: messageEmptyFields,
      })
    } else if (!this.validateEmail(this.LoginInput.textInput.value)) {
      this.emitter.emit("openModal", {
        message: messageValidateEmail,
      })
    } else if (this.PasswordInput.passwordInput.value.length < 6) {
      this.emitter.emit("openModal", {
        message: messagePasswordLength,
      })
    } else if (!this.isLoggedIn()) {
      this.title.innerText = "Register"
      this.register(e)
      this.LoginInput.textInput.value = ""
      this.PasswordInput.passwordInput.value = ""
      document.body.innerHTML = ""
      this.emitter.emit("renderMain", {})
    }
  }

  validateEmail(email) {
    const reg =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return reg.test(String(email).toLowerCase())
  }

  render(target) {
    document.body.innerHTML = ""
    const wraper = document.createElement("form")
    wraper.classList.add("login")

    this.title.classList.add("login__title")
    this.title.innerText = "Login..."

    this.LoginInput.textInput.classList.add("login__login")
    this.LoginInput.textInput.setAttribute("type", "text")
    this.LoginInput.textInput.setAttribute("placeholder", "E-mail...")
    this.LoginInput.textInput.setAttribute("id", "login")

    this.PasswordInput.passwordInput.classList.add("login__password")
    this.PasswordInput.passwordInput.setAttribute("placeholder", "Password...")
    this.PasswordInput.passwordInput.setAttribute("id", "password")

    this.Button.button.classList.add("button")
    this.Button.button.setAttribute("type", "submit")
    this.Button.button.innerText = "Login"
    target.prepend(wraper)
    wraper.prepend(
      this.title,
      this.LoginInput.textInput,
      this.PasswordInput.passwordInput,
      this.Button.button
    )

    wraper.addEventListener("submit", (e) => {
      e.preventDefault()

      this.authentification(e)
    })
  }
}

export default Login
