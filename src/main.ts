import './style.css'
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faUser , faSearch ,faMoon , faPenToSquare,faTrash , faSun} from '@fortawesome/free-solid-svg-icons';

library.add(faHouse, faUser , faSearch,faMoon, faPenToSquare, faTrash , faSun);
dom.watch();

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

let darkBackTheme = document.getElementById('dark-back-theme') as HTMLDivElement;


function addTodoToTodos() {
  if(todoInput.value.trim() ==""){
    return
  }
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
    let UI = `<li class = "${todo.id} relative grid grid-cols-12 items-start">
    <input type="checkbox" id="${todo.id}" class="todo-checkbox col-start-1 col-end-2 cursor-pointer mt-1">
                  <label for="${todo.id}" class="col-start-2 col-span-9 mx-3 cursor-pointer">
                    ${todo.title}
                  </label>
                  <button class="edit cursor-pointer col-span-1 mr-2 sm:mr-0">
                  <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="delete cursor-pointer col-span-1 ml-2 sm:ml-0">
                  <i class="fa-solid fa-trash"></i>
                  </button>
                  </li>`
                  todoList.innerHTML += UI
  })
}
function deleteTodo(taskId: string) {
  todos = todos.filter(todo => String(todo.id) != taskId)
  console.log(todos);
  render()
}
function editTodo(taskId: string) {
  let [taskTodo] = todos.filter((todo) => String(todo.id) == taskId)
  editTodoInput.value = taskTodo.title;
  editTodoInput.focus()
  editTodoInput.setSelectionRange(0 , taskTodo.title.length )
  editForm.addEventListener('submit', function (e: SubmitEvent) {
    e.preventDefault()
    todos.forEach(todo =>{
      if(taskId == String(todo.id)){
        todo.title = editTodoInput.value;
      }
    })
    render()
    editTodoInput.value = ""
    todoInput.focus()
  })
}

// Utility Funcitons
function removePopUp(){
  form.classList.add('hidden');
  darkBackTheme.classList.add('hidden');
  editForm.classList.add('hidden');
}

function displayEditTodo(){
  editForm.classList.remove('hidden');
  darkBackTheme.classList.remove('hidden');
}

// Listener for the edit and delete icon in every todo list
todoList.addEventListener('click', function (e: Event) {
  console.log(this);
  console.log(e.target);
  if (e.target != null) {
    let button: HTMLElement = e.target as HTMLElement;
    console.log(button.textContent);
    let id = button.parentElement?.className[0]
    if (id != null) {
      console.log(id);
      if (button.classList.contains('edit')) {
        displayEditTodo()
        editTodo(id);
      }
      else if (button.classList.contains('delete')) {
        deleteTodo(id);
      }
    }
  }
})


// + button
let addNote = document.getElementById('add-note') as HTMLButtonElement;

let cancelEdit = document.getElementById('cancel-edit') as HTMLButtonElement;
let cancelAdd = document.getElementById('cancel-add') as HTMLButtonElement;


// Listeners

// For form submit
form.addEventListener('submit', function (e: SubmitEvent) {
  e.preventDefault()
  addTodoToTodos()
  render()
  console.log(todoItemsNodes);
})
// For + button
addNote.addEventListener('click',function(){
  form.classList.remove('hidden');
  darkBackTheme.classList.remove('hidden');
  todoInput.focus()
})
// For clicking in dark background
darkBackTheme.addEventListener('click',function(){
  removePopUp()
})
// For Cancel Button
cancelAdd.addEventListener('click',function(){
  removePopUp()
})
// For Cancel Button
cancelEdit.addEventListener('click',function(){
  removePopUp()
})
// For Dark Mode + Light Mode
let searchBox = document.getElementById('search-box') as HTMLDivElement;
let [ _ , moon , sun] = searchBox.children;
searchBox.addEventListener('click',function(e:Event){
  console.log(e.target);
    let currentIconBox = (e.target as HTMLElement).classList
    if(currentIconBox.contains('moon')){
      document.body.classList.add('dark')
      moon.classList.add('hidden')
      sun.classList.remove('hidden');
      
    }
    else if(currentIconBox.contains('sun')){
      document.body.classList.remove('dark')
      // console.log("to light");
      moon.classList.remove('hidden')
      sun.classList.add('hidden');
    }
})

