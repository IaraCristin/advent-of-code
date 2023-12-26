import fs from 'fs';
import { findSourceMap } from 'module';



//Leemos el archivo y lo separamos por cada salto de línea
//Trim() es para sacar espacios en blanco que nos queden sin querer
//Y lo guardamos en un array llamado calibrations
const games = fs.readFileSync('./test.txt', 'utf-8').trim().split('\n');

let total = 0;

for(let game of games){
    let cubesMap = {
        red: 0,
        green: 0,
        blue: 0
    }

    game = game.split(':')
    let game_id = Number(game[0].split(' ')[1]);
    game = game[1];

    game = game.split(/,|;/);

    game.forEach(cube => {
        //Esto es para sacar los espacios vacíos molestos
        cube = cube.trim();
        //Acá pedimos que los separe en base al espacio que queda entre el número y el color
        cube = cube.split(' ');
        let num = Number(cube[0]);
        
        if(num > cubesMap[cube[1]]){
            cubesMap[cube[1]] = num;
        }
        
    });

    let power = Object.values(cubesMap).reduce((s,v) => s * v);
    total += power;

}

console.log(total);

