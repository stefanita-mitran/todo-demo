// This file contains the JavaScript code that handles adding todo items to the list. It listens for input events, updates the DOM, and manages the state of the todo items.

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add-todo');

let todos = [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo;
        todoItem.classList.add('p-2', 'border-b', 'border-gray-300');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('ml-2', 'text-red-500');
        deleteButton.onclick = () => {
            todos.splice(index, 1);
            renderTodos();
        };

        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    });
}

addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push(todoText);
        todoInput.value = '';
        renderTodos();
    }
});

// Allow adding todo with Enter key
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addButton.click();
    }
});
