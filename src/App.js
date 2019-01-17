import React, { Component } from 'react';
import './App.css';
import { observer } from "mobx-react";
import { store } from "./TodosStore";

class App extends Component {
    store = store;

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.store.showCompletedOnly ? 'Completed only': 'All'}
                </div>
                <h5>Total {this.store.count}</h5>
                <ul>
                    {this.store.filteredTodos.map(todo => {
                        return <li key={todo.title}>{todo.title}
                            {todo.completed && <span style={{ marginLeft: 10, color: 'grey' }}>completed</span>}
                            <button onClick={() => todo.toggle()}>Toggle</button>
                        </li>
                    })}
                </ul>
            </React.Fragment>
        );
    }
}

export default observer(App);
