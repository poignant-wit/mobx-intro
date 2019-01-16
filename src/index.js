import './index.css';
import {BehaviorSubject, combineLatest} from "rxjs";

const todos$ = new BehaviorSubject([
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
]);
const showCompletedOnly$ = new BehaviorSubject(false);

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
    showCompletedOnly$.next(!showCompletedOnly$.value)
}

combineLatest(todos$, showCompletedOnly$, (todos, showCompletedOnly) => ({
    todos,
    showCompletedOnly
})).subscribe(render)

const button = document.getElementById("button");
button.addEventListener('click', onToggleFilter);

