import { action, autorun, decorate, observable } from "mobx";


class State {
    todos = [
        {
            title: 'First completed',
            completed: true,
        },
        {
            title: 'Second completed',
            completed: true,
        },
        {
            title: 'Third in process',
            completed: false,
        }
    ];
    showCompletedOnly = false;

    toggleFilter() {
        this.showCompletedOnly = !this.showCompletedOnly;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}

decorate(State, {
    todos: observable,
    showCompletedOnly: observable,
    toggleFilter: action,
    addTodo: action,
});

const state = new State();

window.state = state;

function render(state) {
    let ul;
    ul = document.getElementById("list");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    const todos = state.todos.filter(todo => {
        if (state.showCompletedOnly) {
            return todo.completed;
        }
        return true;
    });
    todos.forEach(todo => {
        const li = document.createElement("li");
        const content = document.createTextNode(todo.title);
        li.appendChild(content);
        ul.appendChild(li);
    });

    const counter = document.getElementById("counter");
    counter.innerText = todos.length.toString();
}

function onToggleFilter() {
    window.state.toggleFilter();
}

function onSubmitButton() {
    const input = document.getElementById("input");
    window.state.addTodo({ title: input.value, completed: false });
}

autorun(() => {
    render(state);
});


const button = document.getElementById("button");
button.addEventListener('click', onToggleFilter);
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener('click', onSubmitButton);

