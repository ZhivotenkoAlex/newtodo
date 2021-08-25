import TextInput from "../elements/textInput.js"
import Button from "../elements/button.js"
import TodoItem from "./todoItem.js"

class MainPage {
  constructor(emitter, store, modal) {
    this.modal = modal
    this.emitter = emitter
    this.store = store
    this.TextInput = TextInput
    this.Button = Button
    this.TodoItem = TodoItem
    this.todosBox = document.createElement("div")
    this.todosList = document.createElement("ul")
    this.todos = this.store.todoStorage || []
  }

  addTodoItem(input) {
    if (input.value) {
      let newTodo = {
        title: input.value,
        checked: false,
        id: Date.now(),
      }
      this.store.setItem(newTodo)

      input.value = ""
      this.renderTodoList()
    } else
      this.emitter.emit("openModal", {
        message: "You can`t save an emty TodoList item",
      })
  }

  setTodoItemStatusDone = (id) => {
    let targetId = id

    for (const [index, item] of this.todos.entries()) {
      if (item.id === targetId) {
        this.todos[index].checked === false
          ? (this.todos[index].checked = true)
          : (this.todos[index].checked = false)
        this.renderTodoList()
      }
    }
  }

  deleteTodoItem = (id) => {
    let targetId = id

    for (const [index, item] of this.todos.entries()) {
      if (item.id === targetId) {
        this.todos.splice(index, 1)
      }
    }
    this.renderTodoList()
  }

  editTodoItem = (id, e) => {
    let targetId = id
    for (const [index, item] of this.todos.entries()) {
      if (item.id === targetId) {
        this.todos[index].title = e.target.innerText
      }
    }

    this.renderTodoList()
  }

  renderMainPage() {
    const main = document.createElement("div")
    main.classList.add("todos")

    const title = document.createElement("h1")
    title.textContent = "TO-DO LIST"
    title.classList.add("todos__title")

    const addButton = document.createElement("a")
    addButton.setAttribute("href", "")
    addButton.innerText = "ADD"
    addButton.classList.add("todos__add")

    const textInput = new this.TextInput()
    textInput.textInput.classList.add("todos__input")
    textInput.textInput.setAttribute("id", "todosInput")
    textInput.textInput.setAttribute("placeholder", "new task")

    const LogOutbutton = new this.Button("Log Out")
    LogOutbutton.button.classList.add("button", "logout__button")
    LogOutbutton.button.setAttribute("id", "todosAddButton")

    this.todosBox.classList.add("todos__box")

    this.todosBox.setAttribute("id", "todosBox")

    this.todosList.classList.add("todos__list")

    document.body.prepend(LogOutbutton.button, title, main, this.todosBox)
    main.prepend(textInput.textInput, addButton),
      this.todosBox.appendChild(this.todosList)

    LogOutbutton.button.addEventListener("click", () => {
      document.body.innerHTML = ""
      this.store.mainRenderStatus = false
      this.emitter.emit("page render", {})
    })

    addButton.addEventListener("click", (e) => {
      e.preventDefault()
      this.addTodoItem(textInput.textInput)
    })

    if (this.todos) {
      this.renderTodoList()
    }
    this.emitter.emit("modalRender", {})
  }

  renderTodoList() {
    this.todosList.innerHTML = ""
    !this.store.todoStorage.length
      ? this.todosBox.classList.add("todos__box--empty")
      : this.todosBox.classList.remove("todos__box--empty")
    this.todos.forEach((item) => {
      let todoItem = new TodoItem({
        target: this.todosList,
        deleteTodoItem: this.deleteTodoItem,
        setTodoDone: this.setTodoItemStatusDone,
        editTodo: this.editTodoItem,
        emitter: this.emitter,
        store: this.store,
        item,
      })

      todoItem.render()
    })
  }
}
export default MainPage
