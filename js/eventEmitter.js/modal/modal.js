import Span from "../elements/span.js"
import Button from "../elements/button.js"

class Modal {
  constructor(emitter, target) {
    this.wrap = document.createElement("div")
    this.modalBox = document.createElement("div")
    this.title = document.createElement("h1")
    this.span = new Span()
    this.emitter = emitter
    this.button = new Button("Close")
    this.buttonAccept = new Button("Yes")
    this.buttonDeny = new Button("No")
    this.target = target
  }
  openModal(message) {
    this.wrap.classList.remove("visually-hidden")
    this.span.span.innerText = message
  }
  closeModal() {
    this.wrap.classList.add("visually-hidden")
  }

  render(message) {
    this.wrap.classList.add("edit__wrapper", "visually-hidden")
    this.modalBox.classList.add("edit__box")
    this.title.classList.add("edit__title")
    this.title.textContent = "Warning"
    this.span.span.classList.add("edit__message")

    this.button.button.classList.add("button")
    this.button.button.setAttribute("id", "editButton")
    this.target.append(this.wrap)
    this.wrap.append(this.modalBox)
    this.modalBox.append(this.title, this.span.span, this.button.button)

    this.button.button.addEventListener("click", () => {
      this.emitter.emit("closeModal", {})
    })
  }
}
export default Modal
