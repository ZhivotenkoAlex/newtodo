import TextInput from "../elements/textInput.js"
import PasswordInput from "../elements/passwordInput.js"
import Button from "../elements/button.js"

class Login {
  constructor(emitter, store, api) {
    this.store = store
    this.emitter = emitter
    this.api = api
    this.LoginInput = new TextInput()
    this.PasswordInput = new PasswordInput()
    this.Button = new Button()
    this.title = document.createElement("span")
    this.users = []
    this.storage = JSON.parse(localStorage.getItem("storage"))
  }

  checkRepeat = () => {
    let login = this.LoginInput.textInput.value
    if (this.storage === null) {
      return false
    } else {
      let isUserInStorage = this.storage.find((item) => item.login === login)
      return isUserInStorage ? true : false
    }
  }

  isLoggedIn = async () => {
    try {
      let email = this.LoginInput.textInput.value
      const user = await this.api.getUser(email)
      return user ? true : false
    } catch (error) {
      console.log(error)
    }
  }

  login = async (e) => {
    try {
      const tokens = await this.api.post("/api/auth/login", {
        email: this.LoginInput.textInput.value,
        password: this.PasswordInput.passwordInput.value,
      })
      this.store.setToken(tokens)
    } catch (error) {
      console.log(error)
    }
  }

  register = async (e) => {
    try {
      this.api.post("/api/user", {
        email: this.LoginInput.textInput.value,
        password: this.PasswordInput.passwordInput.value,
      })
      this.emitter.emit("openModal", {
        message: `User ${this.LoginInput.textInput.value} was added`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  authentification = async (e) => {
    e.preventDefault()

    const isLoggedIn = await this.isLoggedIn()
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
    } else if (isLoggedIn === true) {
      const tokens = await this.login(e)
      this.store.mainRenderStatus = true
      this.emitter.emit("page render", {})
    } else if (isLoggedIn === false) {
      this.register(e)
      this.LoginInput.textInput.value = ""
      this.PasswordInput.passwordInput.value = ""
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
    this.emitter.emit("modalRender", { target: document.body, message: "Test" })
    wraper.addEventListener("submit", (e) => {
      e.preventDefault()
      this.authentification(e)
    })
  }
}

export default Login
