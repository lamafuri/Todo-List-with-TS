import './style.css'


interface Todo {
  readonly id: number,
  title: string,
  isCompleted: boolean,
}
let todos: Todo[] = []
// Input form
let form = document.getElementById('todo-form') as HTMLFormElement;
let todoInput = document.getElementById('todo-input') as HTMLInputElement;

// Edit form
let editForm = document.getElementById('edit-todo-form') as HTMLFormElement;
let editTodoInput = document.getElementById('edit-todo-input') as HTMLInputElement;

let todoList = document.getElementById('todo-list') as HTMLUListElement;
let todoItemsNodes = todoList.children

