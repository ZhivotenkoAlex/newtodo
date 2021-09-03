import MainPage from "./todo/mainPage.js"
import LoginPage from "./register/loginPage.js"
import Emitter from "./helpers/emitter.js"
import Store from "./helpers/store.js"
import Modal from "./modal/modal.js"
import ModalConfirm from "./modal/modalConfirm.js"
import Page from "./page.js"
import API from "./api/apiServices.js"

const emitter = new Emitter()
const store = new Store()
const Api = new API("http://localhost:8080", emitter)
const main = new MainPage(emitter, store, Api)
const loginPage = new LoginPage(emitter, store, Api)
const modal = new Modal(emitter, document.body)
const modalConfirm = new ModalConfirm(emitter, document.body)
const page = new Page(emitter, store)

emitter.subscribe("renderLogin", (data) => loginPage.render(data.target))
emitter.subscribe("renderMain", (data) => main.renderMainPage())

emitter.subscribe("logOut", (data) => loginPage.render(data.target))

emitter.subscribe("modalRender", (data) => modal.render())
emitter.subscribe("openModal", (data) => modal.openModal(data.message))
emitter.subscribe("closeModal", (data) => modal.closeModal())

emitter.subscribe("modalConfirmRender", (data) => modalConfirm.render())

emitter.subscribe("page render", (data) => page.render())

emitter.emit("modalRender", { target: document.body, message: "Test" })
emitter.emit("modalConfirmRender", { target: document.body, message: "Test" })

emitter.emit("page render", {})

// const user = { email: "user@gmail.com", password: "1234" }
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjM2LCJpYXQiOjE2MzA0MjA1MTQsImV4cCI6MTYzMDQ1NjUxNH0.7487LxCMrpERhH9kUpu8DA66hhseDrtyNB7HL2G59-0"

// const todo = {
//   token: "Bearer" + " " + token,
//   id: 47,
// }

// console.log(todo)

// console.log(await Api.createUpdateDelete("POST", "/login", user))
// console.log(await Api.getById(todo))
// console.log(await Api.getItems(todo))
