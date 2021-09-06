class Page {
  constructor(emitter, store) {
    this.emitter = emitter
    this.store = store
  }

  render() {
    document.body.innerHTML = ""

    this.emitter.emit("modalRender", { target: document.body, message: "Test" })
    this.emitter.emit("modalConfirmRender", {
      target: document.body,
      message: "Test",
    })

    this.store.mainRenderStatus
      ? this.emitter.emit("renderMain", {})
      : this.emitter.emit("renderLogin", { target: document.body })
  }
}
export default Page
