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
const db = 'db.json';

function addKoder(koder) {
	const koders = getKoders();
	koders.push(koder);
	updateKoders(koders);
}

function listKoder() {
	const koders = getKoders();
	if (!koders.length) {
		console.log('No koders');
		process.exit();
	}
	koders.forEach((koder, i) => {
		console.log(i, '-', koder);
	});
}

function removeKoder(index) {
	const koders = getKoders();
	koders.splice(index, 1);
	updateKoders(koders);
}

function removeAllKoders() {
	updateKoders([]);
}

function getKoders() {
	const content = fs.readFileSync(db, 'utf8');
	return JSON.parse(content).koders;
}

function updateKoders(koders) {
	const newkoders = { koders: koders };
	const newkodersAsString = JSON.stringify(newkoders);
	fs.writeFileSync(db, newkodersAsString);
}

function startDb() {
	const dbExists = fs.existsSync(db);

	if (!dbExists) fs.writeFileSync(db, JSON.stringify({ koders: [] }));
}

function main() {
	const commad = process.argv[2];
	const arg = process.argv[3];

	startDb();

	switch (commad) {
		case 'add':
			if (!arg) {
				console.error('Missing koder');
				process.exit(1);
			}
			addKoder(arg);
			listKoder();
			console.log('Koder added');
			break;
		case 'ls':
			listKoder();
			break;
		case 'rm':
			if (!arg) {
				console.error('Missing koder index');
				process.exit(1);
			}
			const idx = parseInt(arg);
			if (isNaN(idx)) {
				console.error('Invalid index');
				process.exit(1);
			}

			const koders = getKoders();
			if (idx < 0 || idx >= koders.lenght) {
				console.error('Out range');
				process.exit(1);
			}
			removeKoder(idx);
			listKoder();
			console.log('Koder deleted');
			break;
		case 'reset':
			removeAllKoders();
			console.log('All koders deleted');
			break;
		default:
			console.error('Command not found', commad);
			process.error(1);
			break;
	}
}

main();
