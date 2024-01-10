""" Hacemos \n\n porque así encapsulamos cada grupo, en vez de separar línea por línea 
Además, al poner las cosas así deja el primer elemento del array que estaríamos haciendo en seeds y el resto todo en blocks"""
seeds, *blocks = open("test.txt").read().split("\n\n")

##Pedimos convertir en int los valores numéricos de seed
seeds = list(map(int, seeds.split(':')[1].split()))

#Part 1

def part1(seeds, blocks):
    ##Ahora mapeamos
    for block in blocks:
        ranges = []
        for line in block.splitlines()[1:]:
            ranges.append(list(map(int, line.split())))
        new = []
        for x in seeds:
            for a, b, c in ranges:
                if b <= x < b + c:
                    new.append(x - b + a)
                    break
            #Nota: el else acá es para el for, o sea, si sale del for y no encontró en el rango quiere decir que no llega al break 
            #O sea, acá entra solo si el for quizo seguir pero no hay más elementos en ranges
            else:
                new.append(x)
        seeds = new
    
    print(min(seeds)) 

print("Part 1:")
part1(seeds, blocks)

#Part 2

def part2(inputs, blocks):
    seeds = []
    #Guardamos los rangos
    for i in range(0, len(inputs),2):
        seeds.append((inputs[i], inputs[i] + inputs[i+1]))
    
    ##Ahora mapeamos
    for block in blocks:
        ranges = []
        for line in block.splitlines()[1:]:
            ranges.append(list(map(int, line.split())))
        
        #Cambia acá en comparación a la parte 1
        new = []
        while len(seeds) > 0:
            s, e = seeds.pop()
            for a,b,c in ranges:
                overlap_start = max(s,b)
                overlap_end = min(e,b+c)
                if overlap_start < overlap_end:
                    new.append((overlap_start-b+a, overlap_end -b+a))
                    #Ahora nos encargamos de las partes que se desbordan del overlap, en caso de existir
                    if s < overlap_start:
                        seeds.append((s,overlap_start))
                    if e > overlap_end:
                        seeds.append((overlap_end,e))
                    break
            else:
                new.append((s,e))
        
        seeds = new
    
    print(min(seeds)[0])  

print("Part 2:")
part2(seeds, blocks)