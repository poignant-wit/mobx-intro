import './index.css';
import {action, autorun, decorate, observable} from "mobx";


class State {
    todos =
        [
            {
                title: 'First todo',
                completed: true,
            },
            {
                title: 'Second todo',
                completed: true,
            },
            {
                title: 'Third',
                completed: false,
            }
        ];
    showCompletedOnly = false;

    toggleFilter() {
        this.showCompletedOnly = !this.showCompletedOnly;
    }
}

decorate(State, { showCompletedOnly: observable, toggleFilter: action });

const state = new State();

function render(state) {
    let ul;
    ul = document.getElementById("list");
    const root = document.getElementById("root");
    if (ul) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    } else {
        ul = document.createElement("ul");
        ul.id = 'list';
        root.appendChild(ul);
    }
    state.todos.filter(todo => {
        if (state.showCompletedOnly) {
            return todo.completed;
        }
        return true;
    }).forEach(todo => {
        const li = document.createElement("li");
        const content = document.createTextNode(todo.title);
        li.appendChild(content);
        ul.appendChild(li);
    });
}

function onToggleFilter() {
    state.toggleFilter();
}

autorun(() => {
    render(state);
});

const button = document.getElementById("button");
button.addEventListener('click', onToggleFilter);

