import React, { Component } from "react";
import TodoDataService from "../services/todo.service";

export default class Todo extends Component {
  constructor(props) {
    console.log('in nn')
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {
      currentTodo: {
        id: null,
        title: "",
        description: "",
        status: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTodo(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTodo: {
        ...prevState.currentTodo,
        description: description
      }
    }));
  }

  getTodo(id) {
    TodoDataService.get(id)
      .then(response => {
        console.log('in resp',response)
        this.setState({
          currentTodo: response.data[0]
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentTodo.id,
      title: this.state.currentTodo.title,
      description: this.state.currentTodo.description,
      status: status
    };

    TodoDataService.update(this.state.currentTodo.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTodo: {
            ...prevState.currentTodo,
            status: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTodo() {
    TodoDataService.update(
      this.state.currentTodo.id,
      {
        title: this.state.currentTodo.title,
        description: this.state.currentTodo.description
      }
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The todo was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTodo() {    
    TodoDataService.delete(this.state.currentTodo.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/todos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTodo } = this.state;

    return (
      <div>
        {currentTodo ? (
          <div className="edit-form">
            <h4>Todo</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTodo.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTodo.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTodo.status ? "Completed" : "Pending"}
              </div>
            </form>

            {currentTodo.status ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                Mark Incomplete
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Mark Complete
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTodo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTodo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Todo...</p>
          </div>
        )}
      </div>
    );
  }
}
