// import React, {useState} from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

let lastState;
function useState(initialState) {
    // 有老状态，使用老状态，没有使用默认值
    let state = lastState || (typeof initialState === 'function' ? initialState() : initialState)
    function setState(newState) {
        if(typeof newState === 'function'){
            lastState = newState(lastState)
            if(Object.is(lastState, newState)){
                render()
            } else {
                lastState = newState
                render()
            }
        } else {
            if(Object.is(lastState, newState)){
                return
            } else {
                lastState = newState
                render()
            }
        }
    }
    return [state, setState]
}

function Counter(props){
    console.log('Counter render');
    //useState会返回一个数组，1是状态 2元素改变方法
    // 惰性初始化
    let [state, setState] = useState({number: 0})

    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => setState(state)}>用自己进行更新</button>
            <button onClick={() => setState({number: state.number+1})}>+</button>
        </div>
    )
}

function render(){
    ReactDOM.render(<Counter></Counter>, document.getElementById('root'))
}

render()


