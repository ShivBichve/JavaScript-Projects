let addBtn = document.querySelector('#addBtn');

let inputBox = document.querySelector('#inputBox');

let todoList = document.querySelector('#todoList');

editedToDoList = null;

function addTodos() {
    let inputText = inputBox.value;

    if (addBtn.value === 'Edit') {
        editLocalTodos(editedToDoList.target.previousElementSibling.innerHTML);
        editedToDoList.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = 'Add';
        inputBox.value = '';
    }
    else {

        let li = document.createElement('li');
        let p = document.createElement('p');

        p.innerHTML = inputText;

        li.appendChild(p);
        todoList.appendChild(li);

        let editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.classList.add('btn', 'editBtn');
        li.appendChild(editBtn);

        let removeBtn = document.createElement('button');
        removeBtn.innerHTML = 'Remove';
        removeBtn.classList.add('btn', 'deleteBtn');
        li.appendChild(removeBtn);

        inputBox.value = '';
        inputBox.focus();


        saveToLocalStorage(inputText);

    }
}

function updateTodo(e) {
    if (e.target.innerHTML === 'Remove') {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === 'Edit') {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        addBtn.value = 'Edit';
        editedToDoList = e;
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
            todoList.appendChild(li);

            let editBtn = document.createElement('button');
            editBtn.innerHTML = 'Edit';
            editBtn.classList.add('btn', 'editBtn');
            li.appendChild(editBtn);

            let removeBtn = document.createElement('button');
            removeBtn.innerHTML = 'Remove';
            removeBtn.classList.add('btn', 'deleteBtn');
            li.appendChild(removeBtn);

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
addBtn.addEventListener('click', addTodos);
todoList.addEventListener('click', updateTodo);