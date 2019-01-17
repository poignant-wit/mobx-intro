import { BehaviorSubject, combineLatest } from 'rxjs'

window.state = {
    todos$: new BehaviorSubject(
        [
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
        ]
    ),
    showCompletedOnly$: new BehaviorSubject(false)
};

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

}

function renderCounter(count) {
    const counter = document.getElementById("counter");
    counter.innerText = count;
}

function onToggleFilter() {
    window.state.showCompletedOnly$.next(!window.state.showCompletedOnly$.value);
}

function onSubmitButton() {
    const input = document.getElementById("input");
    const { todos$ } = window.state;
    window.state.todos$.next([...todos$.value, { title: input.value, completed: false }])
}

combineLatest(window.state.todos$, window.state.showCompletedOnly$, (todos, showCompletedOnly) => ({
    todos, showCompletedOnly
})).subscribe(render)

combineLatest(window.state.todos$, window.state.showCompletedOnly$, (todos, showCompletedOnly) => todos.filter(todo => {
    if (showCompletedOnly) {
        return todo.completed;
    }
    return true;
}).length).subscribe(renderCounter)


const button = document.getElementById("button");
button.addEventListener('click', onToggleFilter);
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener('click', onSubmitButton);


