import React from 'react'
import ReactDOM from 'react-dom'

/*
*  useReducer 其实是useState有关
*  useState 其实是useReducer的语法糖
*  当你变更状态的逻辑特别复杂的时候可以使用useReducer
*
* */
// 普通的纯函数 传入老状态和动作，返回新状态
// old {number: 0} action {type: 'ADD'}
let lastState
function useReducer(reducer, initialState) {
    lastState = lastState || initialState
    function dispatch(action) {
        if(reducer){
            lastState = reducer(lastState, action)
        }else {
            lastState = action
        }
        render()
    }
    return [lastState, dispatch]

}

function useState(initialState){
    return useReducer(null, initialState)
}

function reducer(oldState, action) {
    switch (action.type) {
        case "ADD":
            return {number: oldState.number + 1};
        case "MINUS":
            return {number: oldState.number - 1};
        default:
            return oldState
    }
}

let initialState = {number: 0}
function Counter() {
    let [state, dispatch] = useReducer(reducer, initialState) // state默认值0
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={()=>dispatch({type: 'ADD'})}>+</button>
            <button onClick={()=>dispatch({type: 'MINUS'})}>+</button>
        </div>
    )
}

function Counter2() {
    let [state, setState] = useState(initialState) // state默认值0
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={()=>setState({number: state.number+1})}>+</button>
            <button onClick={()=>setState({number: state.number-1})}>-</button>
        </div>
    )
}

function render(){
    ReactDOM.render(
        <>
            <Counter2/>
        </>, document.getElementById('root'))
}

render()


