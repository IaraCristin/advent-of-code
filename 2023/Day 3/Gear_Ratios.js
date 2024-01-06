import fs from 'fs';
import { findSourceMap } from 'module';
import { start } from 'repl';


//Leemos el archivo y lo separamos por cada salto de línea
//Trim() es para sacar espacios en blanco que nos queden sin querer
//Y lo guardamos en un array llamado calibrations
const engine1 = fs.readFileSync('./example.txt', 'utf-8').trim().split('\n');
const engine2 = fs.readFileSync('./test.txt', 'utf-8').trim().split('\n');;

console.log("Part 1")
console.log("Example:", part1(engine1));
console.log("Test:", part1(engine2));


function part1(engine){
    let total = 0;

    for(let lineIndex = 0; lineIndex < engine.length ;lineIndex++){
        let numbers = [];

        let match;
        let pattern = /\d+/g;
        
        //Primero guardamos en match el resultado de buscar el patrón , luego nos fijamos que no sea un null
        while((match = pattern.exec(engine[lineIndex])) !== null){
            numbers.push({start:match.index, end:pattern.lastIndex, number: match[0]});
        }
        
        for (let number of numbers) {
            let partOfSum = false;
            for (let y = lineIndex-1; y <= lineIndex+1; y++) {
                for (let x = number.start-1; x <= number.end; x++) {
                    //Set the range
                    if (y >= 0 && y < engine.length && x >= 0 && x < engine[lineIndex].length){
                        if(isNaN(parseInt(engine[y][x])) && engine[y][x] != '.'){
                            partOfSum = true;
                        }
                    }
                }
            }

            if (partOfSum){
                total += parseInt(number.number);
            }
            
        }


    }

    return total;
}


console.log('\n',"Part 2")
console.log("Example:", part2(engine1));
console.log("Test:", part2(engine2));

function part2(engine){
    let total = 0;
    let map = [];

    for(let lineIndex = 0; lineIndex < engine.length ;lineIndex++){
        let numbers = [];

        let match;
        let pattern = /\d+/g;
        
        //Primero guardamos en match el resultado de buscar el patrón , luego nos fijamos que no sea un null
        while((match = pattern.exec(engine[lineIndex])) !== null){
            numbers.push({start:match.index, end:pattern.lastIndex, number: match[0]});
        }
        
        for (let number of numbers) {
            for (let y = lineIndex-1; y <= lineIndex+1; y++) {
                for (let x = number.start-1; x <= number.end; x++) {
                    //Set the range
                    if (y >= 0 && y < engine.length && x >= 0 && x < engine[lineIndex].length){
                        if(engine[y][x] == '*'){
                            map.push({x,y,number: parseInt(number.number)});
                        }
                    }
                }
            }

            
        }


    }

    for (let y = 0; y < engine.length; y++) {
        for (let x = 0; x < engine[y].length; x++) {
            let selected = map.filter(el => el.x == x && el.y == y);
            if (selected.length == 2) {
                let nums = selected.map(el => el.number);
                total += nums[0] * nums[1];
            }
        }
        
    }

    return total;
}