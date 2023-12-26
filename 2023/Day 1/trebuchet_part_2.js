import fs from 'fs';
import { findSourceMap } from 'module';

//Leemos el archivo y lo separamos por cada salto de línea
//Trim() es para sacar espacios en blanco que nos queden sin querer
//Y lo guardamos en un array llamado calibrations
const calibrations = fs.readFileSync('./test.txt', 'utf-8').trim().split('\n');

const numMap = {
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine"
}


const cal = calibrations.map((line) => {
    //Reemplazamos todas las apareciones de un numero escrito con lo puesto en el numMap
    for(let num of Object.keys(numMap)){
        line = line.replaceAll(num,numMap[num]);
    }
    
    //Adentro del find pasa lo siguiente. Para cada valor v, nos fijamos que se cumpla la condición pedida
    let first = line.split('').find((v) => !Number.isNaN(Number(v)));
    let last = line.split('').findLast((v) => !Number.isNaN(Number(v)));
    return Number(first + last);
})

console.log(cal.reduce((s,v) => s + v)); 