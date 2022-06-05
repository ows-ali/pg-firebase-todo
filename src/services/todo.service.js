import http from "../http-common";

class TodoDataService {
  getAll(pageNumber=1) {
    return http.get(`/todos/${pageNumber}`);
  }
  getAllDone() {
    return http.get(`/todosdone/`);
  }

  get(id) {
    return http.get(`/todo/${id}`);
  }

  create(data) {
    return http.post("/todos", data);
  }

  update(id, data) {
    return http.put(`/todos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/todos/${id}`);
  }

  
  
}

export default new TodoDataService();