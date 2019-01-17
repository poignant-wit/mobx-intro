import { action, decorate, observable } from "mobx";

export class Todo {
    constructor(attrs) {
        this.title = attrs.title;
        this.completed = attrs.completed;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

decorate(Todo, {
    title: observable,
    completed: observable,
    toggle: action,
});
