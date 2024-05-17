const fs = require('fs');
const dbFile = 'db.json';

function add(task) {
	const todos = getTodos();
	todos.push(task);
	updateTodos(todos);
}

function done(taskIndex) {
	const todos = getTodos();
	todos.splice(taskIndex, 1);
	updateTodos(todos);
}

function ls() {
	const todos = getTodos();
	if (!todos.length) {
		console.log('No tasks');
		process.exit();
	}
	todos.forEach((task, i) => {
		console.log(i, '-', task);
	});
}

function alv() {
	updateTodos([]);
}

function init() {
	//Crear el archivo de db
	const fileExists = fs.existsSync(dbFile);

	if (!fileExists) fs.writeFileSync(dbFile, JSON.stringify({ todos: [] }));
}

function getTodos() {
	const content = fs.readFileSync(dbFile, 'utf8');
	return JSON.parse(content).todos;
}

function updateTodos(todos) {
	const newTodos = { todos: todos };
	const newTodosAsString = JSON.stringify(newTodos);
	fs.writeFileSync(dbFile, newTodosAsString);
}

function main() {
	const command = process.argv[2];
	const arg = process.argv[3];

	init();

	if (command === 'ls') {
		ls();
	} else if (command === 'add') {
		if (!arg) {
			console.error('Missing task');
			process.exit(1);
		}

		add(arg);
		ls();
		console.log('Task added');
	} else if (command === 'done') {
		if (!arg) {
			console.error('Missing task index');
			process.exit(1);
		}
		const idx = parseInt(arg);
		if (isNaN(idx)) {
			console.log('Invalid index');
			process.exit(1);
		}

		const todos = getTodos();
		if (idx < 0 || idx >= todos.lenght) {
			console.log('Out range');
			process.exit(1);
		}
		done(idx);
		ls();
		console.log('Task completed!');
	} else if (command === 'alv') {
		alv();
		console.log('Alv');
	} else {
		console.error('Invalid command: ', command);
		process.error(1);
	}
}

main();
