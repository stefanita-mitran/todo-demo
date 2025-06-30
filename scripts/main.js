var todoInput = document.getElementById('todo-input');
var todoList = document.getElementById('todo-list');
var addButton = document.getElementById('add-todo');

var todos = [];

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
