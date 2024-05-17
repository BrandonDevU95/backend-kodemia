// Crea un script que permita:
// - Registrar un nuevo oder [add]
// - listar todos los koders [ls]
// - Eliminar koders por nombre [rm]
// - Eliminar todos los koders [reset]
// Este script debe:
// - Usar un archivo .json como base de datos
// - Recibir los datos por el argv de node

// existSync permite saber si un archivo existe o no
// guardar en un archivo .json usando JSON.stringify
const fs = require('fs');

const commad = process.argv[2];
const name = process.argv[3];

switch (commad) {
	case 'add':
		addKoder();
		break;
	case 'ls':
		listKoder();
		break;
	case 'rm':
		removeKoder();
		break;
	case 'reset':
		removeAllKoders();
		break;
	default:
		console.log('Command not found');
		break;
}

function addKoder() {
	console.log('Add koder');
}

function listKoder() {
	console.log('List koder');
}

function removeKoder() {
	console.log('Remove koder');
}

function removeAllKoders() {
	console.log('Remove all koders');
}

function getKoders() {
	const content = fs.readFileSync(dbFile, 'utf8');
	return JSON.parse(content).todos;
}

function init() {
	const db = 'db.json';
	const fileExists = fs.existsSync(db);

	if (!fileExists) fs.writeFileSync(db, JSON.stringify({}));
}
