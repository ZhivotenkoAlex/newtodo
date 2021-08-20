import MainPage from "../eventEmitter.js/todo/mainPage.js"
import LoginPage from "./register/loginPage.js"
import Emitter from "./helpers/emitter.js"
import Store from "./helpers/store.js"
import Modal from "./modal/modal.js"
import ModalConfirm from "./modal/modalConfirm.js"

const emitter = new Emitter()
const store = new Store()
const main = new MainPage(emitter, store)
const loginPage = new LoginPage(emitter)
const modal = new Modal(emitter, document.body)
const modalConfirm = new ModalConfirm(emitter, document.body)

emitter.subscribe("renderLogin", (data) => loginPage.render(data.target))
emitter.subscribe("renderMain", (data) => main.renderMainPage())
emitter.subscribe("logOut", (data) => loginPage.render(data.target))

emitter.subscribe("modalRender", (data) => modal.render())
emitter.subscribe("openModal", (data) => modal.openModal(data.message))
emitter.subscribe("closeModal", (data) => modal.closeModal())

emitter.subscribe("modalConfirmRender", (data) => modalConfirm.render())

emitter.subscribe("openModalConfirm", (data) =>
  modalConfirm.openModal(data.message)
)
emitter.subscribe("acceptModalConfirm", (data) => {
  modalConfirm.accept()
})
emitter.subscribe("denyModalConfirm", (data) => modalConfirm.deny())

emitter.emit("renderLogin", { target: document.body })
emitter.emit("modalRender", { target: document.body, message: "Test" })
emitter.emit("modalConfirmRender", { target: document.body, message: "Test" })
