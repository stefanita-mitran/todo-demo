// This file contains the JavaScript code that handles adding todo items to the list. It listens for input events, updates the DOM, and manages the state of the todo items.

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add-todo');

let todos = [];
let draggedIndex = null;

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item', 'p-3', 'border-b', 'border-gray-300', 'flex', 'items-center', 'justify-between', 'bg-white', 'rounded', 'mb-1');
        todoItem.draggable = true;
        todoItem.dataset.index = index;
        
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('flex', 'items-center', 'flex-grow');
        
        const dragHandle = document.createElement('div');
        dragHandle.classList.add('drag-handle', 'mr-3', 'text-gray-400', 'hover:text-gray-600');
        dragHandle.innerHTML = '⋮⋮';
        
        const todoText = document.createElement('span');
        todoText.textContent = todo;
        todoText.classList.add('flex-grow');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('ml-2', 'text-red-500', 'hover:text-red-700', 'px-2', 'py-1', 'rounded', 'text-sm');
        deleteButton.onclick = (e) => {
            e.stopPropagation();
            todos.splice(index, 1);
            renderTodos();
        };

        contentContainer.appendChild(dragHandle);
        contentContainer.appendChild(todoText);
        todoItem.appendChild(contentContainer);
        todoItem.appendChild(deleteButton);


        todoItem.addEventListener('dragstart', handleDragStart);
        todoItem.addEventListener('dragover', handleDragOver);
        todoItem.addEventListener('drop', handleDrop);
        todoItem.addEventListener('dragend', handleDragEnd);
        todoItem.addEventListener('dragenter', handleDragEnter);
        todoItem.addEventListener('dragleave', handleDragLeave);

        todoList.appendChild(todoItem);
    });
}

function handleDragStart(e) {
    draggedIndex = parseInt(e.target.dataset.index);
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropIndex = parseInt(e.target.closest('.todo-item').dataset.index);
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {

        const draggedItem = todos.splice(draggedIndex, 1)[0];
        
        todos.splice(dropIndex, 0, draggedItem);
        
        renderTodos();
    }
    
    e.target.classList.remove('drag-over');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.todo-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    draggedIndex = null;
}

addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push(todoText);
        todoInput.value = '';
        renderTodos();
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addButton.click();
    }
});


renderTodos();