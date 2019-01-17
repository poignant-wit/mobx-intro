import React, { Component } from 'react';
import './App.css';
import { observer } from "mobx-react";
import { state } from "./Store";

class App extends Component {

  store  = state;

  render() {
    return (
        <React.Fragment>
            <h5>React completed</h5>
            <h5>{state.count}</h5>
        <ul>
            {this.store.filteredTodos.map(todo => {
                return <li key={todo.title}>{todo.title}</li>
            })}
        </ul>
        </React.Fragment>
    );
  }
}

export default observer(App);
