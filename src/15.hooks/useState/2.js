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
        } else {
            lastState = newState
        }

        render()
    }
    return [state, setState]
}

/*
* 是在函数组件中使用setState
* 函数组件没有生命周期
* 1. 每一次渲染都是一个对立的闭包
*
* */
// 函数组件本身就是一个render方法
function Counter(props){
    //useState会返回一个数组，1是状态 2元素改变方法
    // 惰性初始化
    let [state, setState] = useState(() => {
        console.log('大数据量计算');
        return 60*60*24
    })

    let alertNumber = ()=>{
        setTimeout(() => {
            console.log(state) // 闭包，永远就是0，不能改变
        },3000)
    }
    let add = ()=>{
        setTimeout(() => {
            // setState(state + 1) // add时上下文中state为0

            // 如果我们基于最新的状态进行更新的话
            // setState中还可以传函数，得到一个新状态
            setState(state => state + 1)
        },3000)
    }
    return (
        <div>
            <p>{state}</p>
            <button onClick={() => setState(state+1)}>+</button>
            <button onClick={alertNumber}>alertNumber</button>
            <button onClick={add}>add</button>
        </div>
    )
}

function render(){
    ReactDOM.render(<Counter></Counter>, document.getElementById('root'))
}

render()


