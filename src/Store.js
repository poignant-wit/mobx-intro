import { action, computed, decorate, observable } from "mobx";

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

decorate(State, {
    todos: observable,
    count: computed,
    showCompletedOnly: observable,
    toggleFilter: action,
    addTodo: action,
    filteredTodos: computed,
});

export const state = new State();
window.state = state;
