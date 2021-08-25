class Store {
  constructor() {
    this.todoStorage = []
    this.mainRenderStatus = false
  }

  getItem(id) {
    return this.todoStorage.find((item) => id === item.id)
  }

  setItem(item) {
    this.todoStorage.push(item)
  }

  removeItem(id) {
    this.todoStorage.filter((item) => id === item.id)
  }
}
export default Store
