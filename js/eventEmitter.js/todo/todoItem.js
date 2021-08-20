import CheckBox from "../elements/checkbox.js"
import Button from "../elements/button.js"
import Span from "../elements/span.js"

class TodoItem {
  constructor({
    target,
    deleteTodoItem,
    setTodoDone,
    editTodo,
    emitter,
    store,
    item,
  }) {
    this.CheckBox = CheckBox
    this.Button = Button
    this.Span = Span
    this.target = target
    this.item = item
    this.deleteTodoItem = deleteTodoItem
    this.setTodoDone = setTodoDone
    this.editTodo = editTodo
    this.emitter = emitter
    this.store = store
  }

  remove = () => {
    this.deleteTodoItem(this.item.id)
  }

  setDone = () => {
    this.setTodoDone(this.item.id)
  }

  editItem = (id, e) => {
    this.editTodo(id, e)
  }

  render() {
    const li = document.createElement("li")
    li.classList.add("todos__listItem")
    li.setAttribute("id", this.item.id)

    const span = new this.Span()
    span.span.classList.add("todos__title")
    span.setInnerText(this.item.title)

    this.item.checked ? span.span.classList.add("todos__title--checked") : ""

    const checkbox = new this.CheckBox()
    checkbox.checkbox.classList.add("todos__checkBox")
    checkbox.checkbox.setAttribute("type", "checkbox")
    this.item.checked ? checkbox.setStatus(true) : checkbox.setStatus(false)

    const button = new this.Button("X")
    button.button.classList.add("todos__deleteButton")
    button.button.setAttribute("type", "button")

    this.target
      .appendChild(li)
      .append(span.span, checkbox.checkbox, button.button)

    button.button.addEventListener("click", this.remove)
    checkbox.checkbox.addEventListener("click", this.setDone)

    span.span.addEventListener("click", (e) => {
      if (e.detail === 2) {
        span.setEditable("true")
      }
    })

    span.span.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.editItem(this.item.id, e)
      }
    })
  }
}

export default TodoItem
