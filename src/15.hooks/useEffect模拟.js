let lastDep
let destroy
function useEffect(callback, dep) {
    if(lastDep){
        if(lastDep === dep){

        }else {
            destroy()
            destroy = callback()
            lastDep = dep
        }
    }else {
        destroy = callback()
        lastDep = dep
    }
}

let dep = 1
function Counter(initState) {
    let state = initState
    useEffect(() => {
        console.log('开启一个定时器');
        let timer = setInterval(() => {
            console.log('setInterval');
            console.log(state+1)
        }, 1000)
        return ()=> clearInterval(timer)
    }, initState)
}

Counter(dep)
dep++
Counter(dep)
