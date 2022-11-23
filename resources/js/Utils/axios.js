import axios from "axios"

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
})

export async function createTodo(todo) {
    try {
        const res = await apiClient.post("/todo", todo)
        return res
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function updateTodo(todo) {
    const {id} = todo
    try {
        const res = await apiClient.put("/todo/" + id, todo)
        return res
    } catch(err) {
        console.log(err)
        return false
    }
}

export async function deleteTodo({id}) {
    try {
        const res = await apiClient.delete("/todo/" + id)
        return res  
    } catch(err) {
        console.log(err)
        return false
    }
} 

