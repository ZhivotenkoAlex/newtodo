class ApiServises {
  constructor(http, emitter) {
    this.http = http
    this.emitter = emitter
  }

  post(endPoint, data) {
    return fetch(`${this.http}${endPoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.clone().json())
      .catch((e) => console.log(e))
  }

  async patch(endPoint, data) {
    console.log(data)
    const response = await fetch(`${this.http}${endPoint}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async delete(endPoint, data) {
    const response = await fetch(`${this.http}${endPoint}`, {
      method: "DELETE",
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async getById(data) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/todo/id?id=${data.id}&Authorization=${data.token}`
      )
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  getItems(data) {
    return fetch(`http://localhost:8080/api/todo?Authorization=Bearer ${data}`)
      .then((res) => res.clone().json())
      .catch((e) => console.log(e.message))
  }

  getUser(data) {
    return fetch(`${this.http}/api/user?item=${data}`)
      .then((res) => res.clone().json())
      .catch((e) => console.log(e.message))
  }
}

export default ApiServises
