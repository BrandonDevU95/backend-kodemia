//Funcion que recibe como parametro una strig y lo devuelve invertido
const texto = process.argv[2]

//Opcion 1
const invertirTexto = (text) => {
    return text.split('').reverse().join('')
}

//Opcion2
const invertirTextoAlt = (texto) => {
    let invertido = '';
    for (const letra of texto) {
        invertido = letra + invertido
    }
    return invertido
}

const option1 = invertirTexto(texto) 
console.log(option1);

const option2 = invertirTextoAlt(texto)
console.log(option2);
