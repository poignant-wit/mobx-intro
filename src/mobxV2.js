import { action, autorun, computed, decorate, observable } from "mobx";


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

    get count(){
        return this.filteredTodos.length;
    }

    get filteredTodos(){
        return this.todos.filter(todo => {
            if (this.showCompletedOnly) {
                return todo.completed;
            }
            return true;
        });
    }

    toggleFilter() {
        this.showCompletedOnly = !this.showCompletedOnly;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}

decorate(State, {
    todos: observable,
    count: computed,
    showCompletedOnly: observable,
    toggleFilter: action,
    addTodo: action,
    filteredTodos: computed,
});

const state = new State();

window.state = state;

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
    const input = document.getElementById("input");
    window.state.addTodo({ title: input.value, completed: false });
}

autorun(() => {
    render(state.filteredTodos);
});

autorun(() => {
    renderCounter(state.count);
});


const button = document.getElementById("button");
button.addEventListener('click', onToggleFilter);
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener('click', onSubmitButton);

