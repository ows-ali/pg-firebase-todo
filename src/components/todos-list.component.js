import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { Link } from "react-router-dom";

export default class TodosList extends Component {
  constructor(props) {
    super(props);

    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);

    

    this.state = {
      todos: [],
      currentTodo: null,
      currentIndex: -1,
      totalPages: 0,
      currentPage: 1

    };
  }

  componentDidMount() {
    this.retrieveTodos();
  }


  
  retrieveTodos(pageNumber=1) {
    TodoDataService.getAll(pageNumber)
      .then(response => {
        this.setState({
          todos: response.data.data,
          totalPages: Math.ceil(response.data.count / 5),
          currentPage: pageNumber
        });
        console.log('dss',this.state.totalPages)
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTodos();
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });
  }

  setActiveTodo(todo, index) {
    this.setState({
      currentTodo: todo,
      currentIndex: index
    });
  }

  
  render() {
    const {  todos, currentTodo, currentIndex } = this.state;

    return (
      <div className="list row">
        
        
        <div className="col-md-6">
          <h4>TODO List</h4>

          <ul className="list-group">
            {todos &&
              todos.map((todo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTodo(todo, index)}
                  key={index}
                >
                  {todo.title}
                  
                  {
                  (todo.status) 
                  ?
                    <span className="badge badge-success float-right" >Done</span>                  
                  :
                    <span className="badge badge-danger float-right">Pending</span>
                     }
                </li>
              ))}
          </ul>

          <div className="pagination ">
          {[...Array(this.state.totalPages)].map((el, index) => <span key={index} onClick={()=>this.retrieveTodos(index+1)} style={{padding: 10, margin: 5, color: 'white', background: this.state.currentPage===index+1  ? '#28a745' : 'gray', borderRadius: 5}}>
            
            
              {index+1}
            
            </span>)}
          </div>
        </div>
        <div className="col-md-6">
          {currentTodo ? (
            <div>
              <h4>Todo</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTodo.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTodo.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTodo.status ? "Completed" : "Pending"}
              </div>

              <Link
                to={"/todos/" + currentTodo.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Todo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
