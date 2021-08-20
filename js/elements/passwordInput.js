class PasswordInput {
  constructor() {
    this.passwordInput = document.createElement("input")
    this.passwordInput.setAttribute("type", "password")
  }

  getValue() {
    return this.textInput.value
  }

  render(item, direction) {
    direction === "prepend"
      ? item.prepend(this.textInput)
      : item.prepend(this.textInput)
  }
}
export default PasswordInput
