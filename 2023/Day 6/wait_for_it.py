
time, distance = open("test.txt").read().split("\n")


#Part 1

def part1(time, distance):
    ##Pedimos convertir en int los valores numéricos de time y distance
    time = list(map(int, time.split(':')[1].split()))
    distance = list(map(int, distance.split(':')[1].split()))
    ans = 1

    for race in range(0,len(time)):
        ##race es el index tanto para time como para distance
        wins = 0
        for i in range(0,time[race]+1):
            d = i*(time[race]-i)
            if d > distance[race]:
                wins += 1
        ans *= wins
    
    print(ans)
    
    

print("Part 1:")
part1(time, distance)

#Part 2
#Por lo que vi, no es necesaria realmente una solución binaria, porque no usan números lo suficientemente molestos y grandes. Pero igual voy a intentar dejar constancia de una solución más linda

# runs in O(log(t))
  # let g(x) = x*(t-x) is maximized at t//2
  # we want to know: what is the lowest value s.t. g(x) >= d
  # we want to know: what is the highest value s.t. g(x) >= d

def part2(time, distance):
    ans = 1
    time = int(time.split(':')[1].replace(" ", ""))
    distance = int(distance.split(':')[1].replace(" ", ""))
    
    #Es la cuenta que está dentro del while i, la de d de la parte 1
    def g(x):
        return x*(time-x)

    lo = 0
    hi = time//2
    
    if hi*(time-hi) <= distance:
        return 0

    #Nos fijamos si se cumplen las condiciones que pedimos, sino salta error
    assert(g(lo)<=distance and g(hi)>distance)
    #Buscamos el valor 
    while lo+1<hi:
        m = (lo+hi)//2
        if g(m)>distance:
            hi = m
        else:
            lo = m
    
    assert lo+1 == hi
    assert g(lo)<=distance and g(hi)>distance
    first = hi
    assert g(first)>distance and g(first-1)<=distance
    
    # g(x) == g(t-x), so there's symmetry about the midpoint t/2
    last = int((time/2) + (time/2-first))
    assert g(last)>distance and g(last+1)<=distance, f'last={last} g(last)={g(last)} {g(last+1)} d={distance}'
    return last-first+1
    

print("Part 2:")
print(part2(time, distance))