import { createDiffieHellmanGroup } from 'crypto';
import fs from 'fs';
import { findSourceMap } from 'module';
import { type } from 'os';
import { start } from 'repl';


//Leemos el archivo y lo separamos por cada salto de línea
//Trim() es para sacar espacios en blanco que nos queden sin querer
//Y lo guardamos en un array llamado calibrations
const input1 = fs.readFileSync('./example.txt', 'utf-8').trim().split('\n');
const input2 = fs.readFileSync('./test.txt', 'utf-8').trim().split('\n');

console.log("Part 1")
console.log("Example:", part1(input1));
console.log("Test:", part1(input2));


function part1(almanac){
    let seeds = almanac[0].split(':')[1];
    seeds = seeds.trim().split(' ');
    seeds = seeds.map(seed =>{
        return {seed: Number(seed), changed: false}
    });
    
    
    for(let i=1; i < almanac.length; i++){
        if (almanac[i] != '' && isNaN(almanac[i][0])) {
            //Tenemos categoría 
            
            //Ahora guardamos un objeto por cada i siguiente que sea un mapeo
            for(i=i+1; i < almanac.length && !isNaN(almanac[i][0]); i++){
                let numbers = almanac[i].split(' ').map(Number);
                seeds = seeds.map(seed => {
                    if(seed.seed >= numbers[1] && seed.seed < numbers[1]+numbers[2] && !seed.changed){
                        return {seed: numbers[0] + (seed.seed - numbers[1]) , changed: true};
                    } else {
                        return seed;
                    }
                })
            }

            seeds = seeds.map(seed => {
                return {seed: seed.seed, changed: false};
            })

        }
    }

    //Ahora me fijo cuál es la menor
    let res = seeds[0].seed;
    for(let seed of seeds){
        if (res > seed.seed) {
            res = seed.seed;
        }
    }

    return res;
}


console.log('\n',"Part 2")
console.log("Example:", part2(input1));
//console.log("Test:", part2(input2));


function part2(almanac){
    let seeds = almanac[0].split(':')[1];
    seeds = seeds.trim().split(' ');
    
    let seed_ranges = [];
    for(let i = 0; i < seeds.length-1 ;i++){
        seed_ranges.push({start: Number(seeds[i]), len: Number(seeds[i+1]), changed: false});
        i++;
    }
    
    for(let i=1; i < almanac.length; i++){
        if (almanac[i] != '' && isNaN(almanac[i][0])) {
            //Tenemos categoría 
            //Ahora guardamos un objeto por cada i siguiente que sea un mapeo
            for(i=i+1; i < almanac.length && !isNaN(almanac[i][0]); i++){
                let numbers = almanac[i].split(' ').map(Number);

                for(let range of seed_ranges){
                    /*Queremos ver qué parte del rango le corresponde a esto, entonces, qué opciones tenemos para que cambie el rango
                        1. range incluido o igual al rango del almanaque //No se agregan rangos
                        2. rango corrido a izq //Se divide el rango en 2
                        3. rango corrido a der
                        4. rango mayor al rango propuesto
                    */
                   //Ahora veamos cómo dividimos nuestro rango de ser necesario
                    
                   //El rango original se puede dividir en hasta 3 partes, en peor caso.
                   //Y para esto necesito entonces 4 "indices"
                   let min_num, mid_min, mid_max, max_num;

                   if (range.start < numbers[1]) {
                        min_num = range.start ;
                        mid_min = numbers[1];
                   } else {
                        min_num = numbers[1] ;
                        mid_min = range.start;
                   }

                   if (range.start + range.len < numbers[1] + numbers[2]) {
                        max_num = numbers[1] + numbers[2];
                        mid_max = range.start + range.len;
                   } else {
                        max_num = range.start + range.len;
                        mid_max = numbers[1] + numbers[2];
                   }

                   
                }
            }

        }
    }

    return 0;
}
