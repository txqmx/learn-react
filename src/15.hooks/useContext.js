import React from 'react'
import ReactDOM from 'react-dom'
// let Context =  React.createContext()

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

function createContext() {
    function Provider(props) {
        Provider._currentValue = props.value
        return props.children
    }
    let context =  {
        Provider,
        get _currentValue(){
            return Provider._currentValue
        }
    }
    return context
}
let Context = createContext()

function useContext(Context) {
    return Context._currentValue
}

function Counter3() {
    // 在Counter3里面获得状态值 和dispatch方法
    let {state, dispatch} = useContext(Context)
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={()=>dispatch({type: 'ADD'})}>+</button>
            <button onClick={()=>dispatch({type: 'MINUS'})}>+</button>
        </div>
    )
}

function App() {
    let [state, dispatch] = useReducer(reducer, {number: 0})
    let contextValue = {state, dispatch}
    return (
        <Context.Provider value={contextValue}>
            <Counter3/>
        </Context.Provider>
    )
}

function render(){
    ReactDOM.render(<App/>, document.getElementById('root'))
}

render()


