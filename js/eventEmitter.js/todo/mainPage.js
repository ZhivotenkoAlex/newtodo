import TextInput from "../elements/textInput.js"
import Button from "../elements/button.js"
import TodoItem from "./todoItem.js"

class MainPage {
  constructor(emitter, store) {
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

    const functionsLink = document.createElement("a")
    functionsLink.setAttribute("href", "../index.html")
    functionsLink.innerText = "To functions"

    const classLink = document.createElement("a")
    classLink.setAttribute("href", "./class.html")
    classLink.innerText = "To OneEntryPoint"

    const textInput = new this.TextInput()
    textInput.textInput.classList.add("todos__input")
    textInput.textInput.setAttribute("id", "todosInput")

    const button = new this.Button("Add todo")
    button.button.classList.add("button")
    button.button.setAttribute("id", "todosAddButton")

    const LogOutbutton = new this.Button("Log Out")
    LogOutbutton.button.classList.add("button")
    LogOutbutton.button.setAttribute("id", "todosAddButton")

    this.todosBox.classList.add("todos__box")
    this.todosBox.setAttribute("id", "todosBox")

    this.todosList.classList.add("todos__list")

    document.body.prepend(LogOutbutton.button, main)
    main.prepend(textInput.textInput, button.button, this.todosBox)

    this.todosBox.appendChild(this.todosList)

    LogOutbutton.button.addEventListener("click", () => {
      document.body.innerHTML = ""
      this.emitter.emit("renderLogin", { target: document.body })
      this.emitter.unsubscribe("renderMain", (data) => main.renderMainPage())
    })

    button.button.addEventListener("click", () => {
      this.addTodoItem(textInput.textInput)
    })

    if (this.todos) {
      this.renderTodoList()
    }
    this.emitter.emit("modalRender", {})
  }

  renderTodoList() {
    this.todosList.innerHTML = ""
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
