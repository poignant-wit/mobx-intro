import { action, autorun, computed, decorate, observable } from "mobx";
import App from './App';
import React from 'react'
import ReactDOM from 'react-dom'



function render(todos) {
    let ul;
    ul = document.getElementById("list");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    todos.forEach(todo => {
        const li = document.createElement("li");
        const content = document.createTextNode(todo.title);
        li.appendChild(content);
        ul.appendChild(li);
    });
}

function renderCounter(count) {
    const counter = document.getElementById("counter");
    counter.innerText = count;
}

function onToggleFilter() {
    window.state.toggleFilter();
}

function onSubmitButton() {
    console.log('submit');
    const input = document.getElementById("input");
    window.state.addTodo({ title: input.value, completed: false });
}


const button = document.getElementById("button");
button.addEventListener('click', onToggleFilter);
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener('click', onSubmitButton);

const root = document.getElementById("root");
ReactDOM.render( <App />, root)



