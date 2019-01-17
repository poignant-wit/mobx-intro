import { action, computed, decorate, observable } from "mobx";
import { Todo } from "./Todo";

const todos = [
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
class TodosStore {
    showCompletedOnly = false;

    constructor(todos){
        this.todos = todos.map(t => new Todo(t));
    }

    toggleFilter() {
        this.showCompletedOnly = !this.showCompletedOnly;
    }

    addTodo(todo) {
        this.todos.push(new Todo(todo));
    }

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
}

decorate(TodosStore, {
    todos: observable,
    count: computed,
    showCompletedOnly: observable,
    toggleFilter: action,
    addTodo: action,
    filteredTodos: computed,
});

export const store = new TodosStore(todos);
window.state = store;
