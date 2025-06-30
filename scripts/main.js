// This file contains the JavaScript code that handles adding todo items to the list. It listens for input events, updates the DOM, and manages the state of the todo items.

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add-todo');

let todos = [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('p-2', 'border-b', 'border-gray-300', 'flex', 'flex-col', 'items-start', 'gap-1');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('text-red-500', 'self-end', 'mb-1');
        deleteButton.onclick = () => {
            todos.splice(index, 1);
            renderTodos();
        };

        const todoText = document.createElement('span');
        todoText.textContent = todo;
        todoText.classList.add('block', 'w-full', 'break-words', 'whitespace-pre-line', 'max-w-full');

        todoItem.appendChild(deleteButton);
        todoItem.appendChild(todoText);
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
