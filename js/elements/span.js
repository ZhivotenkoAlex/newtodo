class Span {
  constructor() {
    this.span = document.createElement("span")
  }

  setInnerText(content) {
    this.span.innerText = content
  }

  setEditable(boolean) {
    boolean
      ? this.span.setAttribute("contenteditable", "true")
      : this.span.setAttribute("contenteditable", "false")
  }

  render(item, direction) {
    direction === "prepend" ? item.prepend(this.span) : item.append(this.span)
  }
}
export default Span
