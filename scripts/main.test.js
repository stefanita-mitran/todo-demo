const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');

// Load the index.html file and main.js script
const htmlFilePath = path.resolve(__dirname, '../index.html');
const jsFilePath = path.resolve(__dirname, './main.js');
const htmlContent = fs.readFileSync(htmlFilePath);
const jsContent = fs.readFileSync(jsFilePath);

const dom = new JSDOM(htmlContent, {
    runScripts: 'dangerously',
    resources: 'usable'
});

// Inject the main.js script into the DOM
const scriptElement = dom.window.document.createElement('script');
scriptElement.textContent = jsContent;
dom.window.document.body.appendChild(scriptElement);

// Access DOM elements
const todoInput = dom.window.todoInput;
const todoList = dom.window.todoList;
const addButton = dom.window.addButton;

// Tests
const { test, expect, beforeEach } = require('@jest/globals');

beforeEach(() => {
	clearTodos()
});

test('renderTodos should render todos correctly', () => {
    dom.window.todos = ['Test Todo 1', 'Test Todo 2'];
    dom.window.renderTodos();

    const todoItems = todoList.querySelectorAll('li');
    expect(todoItems.length).toBe(2);
    expect(todoItems[0].textContent).toContain('Test Todo 1');
    expect(todoItems[1].textContent).toContain('Test Todo 2');
});

test('addButton click should add a new todo', () => {
    todoInput.value = 'New Todo';
    addButton.click();

    expect(dom.window.todos.length).toBe(1);
    expect(dom.window.todos[0]).toBe('New Todo');

    const todoItems = todoList.querySelectorAll('li');
    expect(todoItems.length).toBe(1);
    expect(todoItems[0].textContent).toContain('New Todo');
});

clearTodos = () => {
	dom.window.todos = [];
	dom.window.renderTodos();
}