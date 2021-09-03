class Store {
  constructor() {
    this.todoStorage = []
    this.mainRenderStatus = false
    this.tokens = ""
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

  setToken(item) {
    this.tokens = item

    return "Tokens are saved"
  }
  async getToken() {
    try {
      return this.tokens
    } catch (error) {
      console.log(error)
    }
  }
}
export default Store
