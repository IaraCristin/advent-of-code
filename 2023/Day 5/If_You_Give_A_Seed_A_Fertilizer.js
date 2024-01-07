import fs from 'fs';
import { findSourceMap } from 'module';
import { type } from 'os';
import { start } from 'repl';


//Leemos el archivo y lo separamos por cada salto de línea
//Trim() es para sacar espacios en blanco que nos queden sin querer
//Y lo guardamos en un array llamado calibrations
const input1 = fs.readFileSync('./example.txt', 'utf-8').trim().split('\r\n');
const input2 = fs.readFileSync('./test.txt', 'utf-8').trim().split('\r\n');

console.log("Part 1")
console.log("Example:", part1(input1));
//console.log("Test:", part1(input2));


function part1(almanac){
    let min_location = Number.MAX_VALUE;
    console.log(almanac);

    let categories_map;
    for(i=1; i < almanac.length; i++){
        
    }

    return min_location;
}


/* console.log('\n',"Part 2")
console.log("Example:", part2(input1));
console.log("Test:", part2(input2));
 */

function part2(cards){
    //Primero mapeamos la cantidad de tarjetas que tenemos
    let copies = {};
    for(let i = 1; i <= cards.length ;i++){
        copies[i] = 1;
    }
    
    for(let card of cards){
        let id = card.split(':')[0].split(' ');
        id = Number(id[id.length -1]);

        card = card.split(':')[1].split('|');
        let win_nums_aux = card[0].trim().split(' ');
        let my_nums_aux = card[1].trim().split(' ');

        let win_nums = [];
        for(let num of win_nums_aux){
            if (num != '') {
                win_nums.push(Number(num));
            }
        }

        let my_nums = [];
        for(let num of my_nums_aux){
            if (num != '') {
                my_nums.push(Number(num));
            }
        }

        //Ordenamos de forma ascendente ambos arrays
        win_nums.sort((a,b) => a-b);
        my_nums.sort((a,b) => a-b);

        //Y ahora los comparamos para ver a qué potencia de 2 nos encontramos con esta carta
        let winnings = 0;
        let i_w = 0; //Index for win_nums
        let i_m = 0; //Index for my_nums

        while(i_w < win_nums.length && i_m < my_nums.length){
            if (my_nums[i_m] == win_nums[i_w]) {
                winnings++;
                i_m++;
                i_w++;
            } else if (my_nums[i_m] > win_nums[i_w]) {
                i_w++;
            } else {
                i_m++;
            }
        }

        //Y ahora cambiamos el mapeo de las copias y agregamos a cards
        for (let i = 1; i <= winnings; i++) {
            copies[id + i] += copies[id];
        }
    }
    
    let total = Object.values(copies).reduce((a,b) => a+b);

    return total;
}