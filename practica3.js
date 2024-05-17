//Funcion que imprime numeros del 1 al 100
//Si es divisible entre 3 imprima Fizz delante
//Si es divisible entre 5 imprima Buzz delante
//Si es divisible entre 3 y 5 imprima FizzBuzz delante

function fizzBuzz() {
	for (let i = 1; i <= 100; i++) {
		if (i % 3 === 0 && i % 5 === 0) {
			console.log(`${i} - FizzBuzz`);
		} else if (i % 3 === 0) {
			console.log(`${i} - Fizz`);
		} else if (i % 5 === 0) {
			console.log(`${i} - Buzz`);
		} else {
			console.log(i);
		}
	}
}

fizzBuzz();
