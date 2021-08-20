class Store {
  constructor() {
    this.todoStorage = []
  }

  getItem(id) {
    return this.todoStorage.find((item) => id === item.id)
  }

  setItem(item) {
    this.todoStorage.push(item)
    return console.log(this.todoStorage)
  }

  removeItem(id) {
    this.todoStorage.filter((item) => id === item.id)
  }
}
export default Store
