class CheckBox {
  constructor() {
    this.checkbox = document.createElement("input")
    this.checkbox.setAttribute("type", "checkbox")
  }

  isCheked() {
    return this.checkbox.checked
  }

  setStatus(boolean) {
    this.checkbox.checked = boolean
  }

  render(item, direction) {
    direction === "prepend"
      ? item.prepend(this.checkbox)
      : item.append(this.checkbox)
  }
}
export default CheckBox
