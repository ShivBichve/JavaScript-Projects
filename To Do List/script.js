let addBtn = document.querySelector('#addBtn');

let inputBox = document.querySelector('#inputBox');

let todoList = document.querySelector('#todoList');

let editedTodo = null;

function addTask() {
    let inputText = inputBox.value;
    if (inputBox.value === '') {
        alert('please enter any to do list');
        return;
    }

    if (addBtn.value === 'Edit') {
        editLocalTodos(editedTodo.target.previousElementSibling.innerHTML);
        editedTodo.target.previousElementSibling.innerHTML = inputText;
        inputBox.value = '';
        addBtn.value = 'Add';
    } else {

        let li = document.createElement('li');
        let p = document.createElement('p');

        p.innerHTML = inputText;
        li.appendChild(p);

        let editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.classList.add('btn', 'editBtn');
        li.appendChild(editBtn);


        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';

        li.appendChild(deleteBtn);
        deleteBtn.classList.add('btn', 'deleteBtn');
        todoList.appendChild(li);
        inputBox.value = '';

        saveToLocalStorage(inputText);
    }
}

function updateTodo(e) {
    if (e.target.innerHTML === 'Delete') {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === 'Edit') {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = 'Edit';
        editedTodo = e;
    }
}

function saveToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    // console.log(todos);
}

function getLocalTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach((todo) => {
            let li = document.createElement('li');
            let p = document.createElement('p');

            p.innerHTML = todo;
            li.appendChild(p);

            let editBtn = document.createElement('button');
            editBtn.innerHTML = 'Edit';
            editBtn.classList.add('btn', 'editBtn');
            li.appendChild(editBtn);


            let deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Delete';

            li.appendChild(deleteBtn);
            deleteBtn.classList.add('btn', 'deleteBtn');
            todoList.appendChild(li);
        });
    }
}

function deleteLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function editLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem('todos', JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTask);
todoList.addEventListener('click', updateTodo);