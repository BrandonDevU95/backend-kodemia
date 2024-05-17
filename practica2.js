//FUncion que recibe un numero y determina si es un numero par o impar

const numero = process.argv[2];

const parImpar = (num) => {
	const res = parseInt(num) % 2;
	return res === 0 ? 'Es par' : 'Es impar';
};

const respuesta = parImpar(numero);
console.log(respuesta);
