import TextInput from "../elements/textInput.js"
import Button from "../elements/button.js"
import TodoItem from "./todoItem.js"

class MainPage {
  constructor(emitter, store, api) {
    this.api = api
    this.emitter = emitter
    this.store = store
    this.TextInput = TextInput
    this.Button = Button
    this.TodoItem = TodoItem
    this.todosBox = document.createElement("div")
    this.todosList = document.createElement("ul")
    this.todos = this.store.todoStorage || []
    this.tokens = ""
  }

  addTodoItem(input) {
    if (input.value) {
      let newTodo = {
        title: input.value,
        token: `Bearer ${this.tokens.accessToken}`,
      }

      this.api.post("/api/todo", newTodo)
      input.value = ""
      this.renderTodoList()
    } else
      this.emitter.emit("openModal", {
        message: "You can`t save an emty TodoList item",
      })
  }

  setTodoItemStatusDone = async (id) => {
    const todo = await this.api.getById({
      id,
      token: `Bearer ${this.store.tokens.accessToken}`,
    })
    console.log("todo")
    console.log(todo)
    const data = {
      id,
      checked: !todo.checked,
      token: `Bearer ${this.store.tokens.accessToken}`,
    }

    await this.api.patch("/api/todo/check", data)

    await this.renderTodoList()
  }

  deleteTodoItem = async (id) => {
    this.api.delete("/api/todo", {
      id,
      token: `Bearer ${this.tokens.accessToken}`,
    })
    await this.renderTodoList()
  }

  editTodoItem = async (id, e) => {
    await this.api.patch("/api/todo/title", {
      id,
      title: e.target.innerText,
      token: `Bearer ${this.tokens.accessToken}`,
    })

    // let targetId = id
    // for (const [index, item] of this.todos.entries()) {
    //   if (item.id === targetId) {
    //     this.todos[index].title = e.target.innerText
    //   }
    // }

    await this.renderTodoList()
  }

  async renderMainPage() {
    document.body.innerHTML = ""
    this.tokens = await this.store.getToken()
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

    LogOutbutton.button.addEventListener("click", async () => {
      document.body.innerHTML = ""
      this.store.mainRenderStatus = false
      await this.emitter.emit("page render", {})
    })

    addButton.addEventListener("click", (e) => {
      e.preventDefault()

      this.addTodoItem(textInput.textInput)
    })

    if (this.todos) {
      await this.renderTodoList()
    }
    this.emitter.emit("modalRender", {})
  }

  async renderTodoList() {
    this.todosList.innerHTML = ""
    const todos = await this.api.getItems(this.tokens.accessToken)
    !todos.length
      ? this.todosBox.classList.add("todos__box--empty")
      : this.todosBox.classList.remove("todos__box--empty")

    todos.forEach((item) => {
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
