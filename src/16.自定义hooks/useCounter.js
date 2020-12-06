import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'

// 如果一个函数是以use开头，并且调用了其他hooks，我们就称他为一个自定义hook
// 复用逻辑
function useCounter(initialState) {
    let [state, setState] = useState(initialState)
    useEffect(() => {
        setInterval(() => setState(state=> state+1), 1000)
    },[])
    return state
}

function Counter1(){
    let state = useCounter(5)
    return (
        <>
            <p>{state}</p>
            <button onClick={() => setState(state+1)}>+</button>
        </>
    )
}

ReactDOM.render(<Counter1/>, document.getElementById('root'))


