import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/add-todo.component";
import Todo from "./components/todo.component";
import TodosList from "./components/todos-list.component";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./config/firebase";
import { signOut } from "firebase/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);

  // render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/todos"} className="navbar-brand">
            OWS App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item" style={{display: user?'none':''}}>
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item" style={{display: user?'none':''}}>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item" style={{display: !user?'none':''}}>
              <span onClick={()=>{signOut(auth)}} className="nav-link">
                Logout
              </span>
            </li>

          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/todos" component={TodosList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path={["/dashboard",'/']} component={Dashboard} />
            <Route exact path="/add" component={AddTodo} />
            <Route path="/todos/:id" component={Todo} />
          </Switch>
        </div>
      </div>
    );
  // }
}

export default App;
