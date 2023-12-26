import fs from 'fs';
import { findSourceMap } from 'module';


const cubesMap = {
    red: 12,
    green: 13,
    blue: 14
}

//Leemos el archivo y lo separamos por cada salto de línea
//Trim() es para sacar espacios en blanco que nos queden sin querer
//Y lo guardamos en un array llamado calibrations
const games = fs.readFileSync('./test.txt', 'utf-8').trim().split('\n');

let total = 0;

for(let game of games){
    game = game.split(':')
    let game_id = Number(game[0].split(' ')[1]);
    game = game[1];

    game = game.split(/,|;/);
    let check = true;

    game.forEach(cube => {
        //Esto es para sacar los espacios vacíos molestos
        cube = cube.trim();
        //Acá pedimos que los separe en base al espacio que queda entre el número y el color
        cube = cube.split(' ');
        let num = Number(cube[0]);
        
        if(num > cubesMap[cube[1]]){
            check = false;
        }
        
    });

    if(check){
        total += game_id;
    }

}

console.log(total);

