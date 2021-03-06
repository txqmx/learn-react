import React from 'react'
// import React, {useState} from 'react'
import ReactDOM from 'react-dom'


let lastState;
function useState(initialState) {
    // 有老状态，使用老状态，没有使用默认值
    let state = lastState || (typeof initialState === 'function' ? initialState() : initialState)
    function setState(newState) {
        if(typeof newState === 'function'){
            newState = newState(lastState)
        }
        if(!Object.is(lastState, newState)){
            lastState = newState
            render()
        }
    }
    return [state, setState]
}

let lastCallback, lastCallbackDeps
function useCallback(callback, deps) {
    if(lastCallbackDeps){
        let same = deps.every((item, index) => item === lastCallbackDeps[index])
        if(!same){
            lastCallback = callback
            lastCallbackDeps = deps
        }
    } else {
        lastCallback = callback
        lastCallbackDeps = deps
    }
    return lastCallback
}

let lastMemo, lastMemoDeps
function useMemo(factory, deps) {
    if(lastMemoDeps){
        let same = deps.every((item, index) => item === lastMemoDeps[index])
        if(!same){
            lastMemo = factory()
            lastMemoDeps = deps
        }
    } else {
        lastMemo = factory()
        lastMemoDeps = deps
    }
    return lastMemo
}



/*
* useCallback 减少函数创建次数
* useMemo 减少对象创建次数
* */

function Child(props) {
    console.log('Child render'); // 渲染子组件
    return (
        <button onClick={props.handleClick}>{props.data.number}</button>
    )
}
// memo 备忘录 如果你想让一个函数组件有一个功能，如果属性不变，就不要刷新
let MemoChild = React.memo(Child)

function App() {
    let [number, setNumber] = useState(0)
    const handleClick = useCallback(()=> setNumber(number+1), [number])
    // useMemo 缓存函数的返回值 {number: 0}
    // 第二个参数是依赖数组，依赖变化才会重新计算number值 空数组则意味着不依赖任何变量
    const data = useMemo(()=>({number}), [number])

    return (
        <div>
            <MemoChild handleClick={handleClick} data={data}/>
        </div>
    )
}
function render(){
    ReactDOM.render(<App></App>, document.getElementById('root'))
}

render()


