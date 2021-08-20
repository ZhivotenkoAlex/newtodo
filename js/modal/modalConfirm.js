import Span from "../elements/span.js"
import Button from "../elements/button.js"

class ModalConfirm {
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
  accept() {
    this.wrap.classList.add("visually-hidden")
    return true
  }
  deny() {
    this.wrap.classList.add("visually-hidden")
    return false
  }

  render(message) {
    this.wrap.classList.add("edit__wrapper", "visually-hidden")
    this.modalBox.classList.add("edit__box")
    this.title.classList.add("edit__title")
    this.title.textContent = "Warning"
    this.span.span.classList.add("edit__message")

    this.buttonAccept.button.classList.add("button")

    this.buttonDeny.button.classList.add("button")

    this.target.append(this.wrap)
    this.wrap.append(this.modalBox)
    this.modalBox.append(
      this.title,
      this.span.span,
      this.buttonAccept.button,
      this.buttonDeny.button
    )

    this.buttonAccept.button.addEventListener("click", () => {
      this.emitter.emit("acceptModalConfirm", {})
      return true
    })
    this.buttonDeny.button.addEventListener("click", () => {
      this.emitter.emit("denyModalConfirm", {})
      return false
    })
  }
}
export default ModalConfirm
