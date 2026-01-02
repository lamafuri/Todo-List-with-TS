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

function addTodoToTodos() {
  let myTodo = {

    title: todoInput.value,
    id: (todos.length == 0) ? 1 : Math.max(...todos.map(todo => todo.id + 1)),
    isCompleted: false
  }
  todoInput.value = ""
  todoInput.focus()
  todos.push(myTodo);
}
function render() {
  todoList.innerHTML = ""
  todos.forEach((todo) => {
    let UI = `<li class = "${todo.id} my">
                  <input type="checkbox" id="${todo.id}">
                  <label for="${todo.id}">
                    ${todo.title}
                  </label>
                  <button>Edit</button>
                  <button>Delete</button>
                </li>`
    todoList.innerHTML += UI
  })
}

// Listeners
form.addEventListener('submit', function (e: SubmitEvent) {
  e.preventDefault()
  addTodoToTodos()
  render()
  console.log(todoItemsNodes);

})