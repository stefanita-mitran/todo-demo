// This file contains the JavaScript code that handles adding todo items to the list. It listens for input events, updates the DOM, and manages the state of the todo items.

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add-todo');

let todos = [];

// Localization data
const translations = {
    en: {
        title: 'Todo App',
        input_placeholder: 'Add a new todo',
        add_todo: 'Add Todo',
        delete: 'Delete',
    },
    ro: {
        title: 'Aplicație de notițe',
        input_placeholder: 'Adaugă o notiță nouă',
        add_todo: 'Adaugă notiță',
        delete: 'Șterge',
    },
    da: {
        title: 'Opgaveliste',
        input_placeholder: 'Tilføj en ny opgave',
        add_todo: 'Tilføj opgave',
        delete: 'Slet',
    }
};

const flagSelector = document.getElementById('flag-selector');
const flagImages = flagSelector.querySelectorAll('img');

function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    applyTranslations(lang);
    highlightSelectedFlag(lang);
}

function highlightSelectedFlag(lang) {
    flagImages.forEach(img => {
        if (img.getAttribute('data-lang') === lang) {
            img.classList.add('border-blue-500');
        } else {
            img.classList.remove('border-blue-500');
        }
    });
}

function applyTranslations(lang) {
    const t = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.setAttribute('placeholder', t[key]);
    });
    // Update delete buttons
    document.querySelectorAll('#todo-list button').forEach(btn => {
        btn.textContent = t.delete;
    });
}

flagImages.forEach(img => {
    img.addEventListener('click', () => {
        setLanguage(img.getAttribute('data-lang'));
    });
});

// Load preferred language
const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
applyTranslations(preferredLanguage);
highlightSelectedFlag(preferredLanguage);

function renderTodos() {
    todoList.innerHTML = '';
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo;
        todoItem.classList.add('p-2', 'border-b', 'border-gray-300');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = translations[lang].delete;
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
