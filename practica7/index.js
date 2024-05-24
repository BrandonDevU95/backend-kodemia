const express = require('express');
const fs = require('fs');
const db = 'db.json';

const app = express();

function startDb() {
	const dbExists = fs.existsSync(db);

	if (!dbExists) fs.writeFileSync(db, JSON.stringify({ koders: [] }));
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

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello Koders!');
});

app.get('/koders', (req, res) => {
	const koders = getKoders();
	res.status(200);
	res.json(koders);
});

app.post('/koders', (req, res) => {
	const { name, generation, gender, age, isActive } = req.body;
	if (!name || !gender || !age || !generation || isActive === undefined) {
		res.status(400);
		res.json({ error: 'Missing fields' });
		return;
	}

	if (isNaN(parseInt(age))) {
		res.status(400);
		res.json({ error: 'Age must be a number' });
		return;
	}

	if (isNaN(parseInt(generation))) {
		res.status(400);
		res.json({ error: 'Generation must be a number' });
		return;
	}

	const koders = getKoders();
	koders.push({
		name,
		generation,
		gender,
		age,
		isActive,
	});
	updateKoders(koders);
	res.status(201);
	res.json(koders);
});

app.delete('/koders/:name', (req, res) => {
	const name = req.params.name;
	const koders = getKoders();
	const filteredKoders = koders.filter((koder) => koder.name !== name);
	updateKoders(filteredKoders);
	res.status(200);
	res.json(koders);
});

app.delete('/koders', (req, res) => {
	updateKoders([]);
	res.status(200);
	res.json({ message: 'All koders deleted' });
});

app.listen(3000, () => {
	startDb();
	console.log('Server is running on http://localhost:3000');
});
