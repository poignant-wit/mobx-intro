
window.state = {
    todos:
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
        ],
    showCompletedOnly: false
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

    const counter = document.getElementById("counter");
    counter.innerText = todos.length.toString();
}

function onToggleFilter() {
    window.state.showCompletedOnly = !window.state.showCompletedOnly
    render(window.state);
}

function onSubmitButton() {
    const input = document.getElementById("input");
    window.state.todos.push({title: input.value, completed: false})
    render(window.state)
}

render(window.state);


const button = document.getElementById("button");
button.addEventListener('click', onToggleFilter);
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener('click', onSubmitButton);


