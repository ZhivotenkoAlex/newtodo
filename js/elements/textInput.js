class TextInput {
  constructor() {
    this.textInput = document.createElement("input")
    this.textInput.setAttribute("type", "text")
  }

  getValue() {
    return this.textInput.value
  }

  setValue(itemValue) {
    this.textInput.value = itemValue
  }

  render(item, direction) {
    direction === "prepend"
      ? item.prepend(this.textInput)
      : item.prepend(this.textInput)
  }
}
export default TextInput
