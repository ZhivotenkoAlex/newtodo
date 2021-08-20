class Button {
  constructor(innerText) {
    this.button = document.createElement("button")
    this.button.innerText = innerText
  }

  renderAppend(item) {
    item.append(this.button)
  }
  renderPrepend(item) {
    item.prepend(this.button)
  }
  render(item, direction) {
    direction === "prepend"
      ? item.prepend(this.button)
      : item.append(this.button)
  }
}

export default Button
