import React from 'react'
// import React, {useState} from 'react'
import ReactDOM from 'react-dom'


let hookStates = [] // 放组件的所有的hooks数据
let hookIndex = 0 // 代表当前hooks的索引

function useState(initialState) {
    // 有老状态，使用老状态，没有使用默认值
    hookStates[hookIndex] = hookStates[hookIndex] || initialState
    let currentIndex = hookIndex
    function setState(newState) {
        hookStates[currentIndex] = newState
        render()
    }
    return [hookStates[hookIndex++], setState]
}


function useCallback(callback, deps) {
    if(hookStates[hookIndex]){
        let [lastCallback, lastCallbackDeps] = hookStates[hookIndex]
        let same = deps.every((item, index) => item === lastCallbackDeps[index])
        if(same){ // 如果老的依赖和新的依赖都相同，则直接返回老的，如果不相同返回新的
            hookIndex++
            return lastCallback
        } else {
            hookStates[hookIndex++] = [callback, deps]
            return callback
        }
    } else {
        hookStates[hookIndex++] = [callback, deps]
        return callback
    }
}

function useMemo(factory, deps) {
    if(hookStates[hookIndex]){
        let [memo, lastDeps] = hookStates[hookIndex]
        let same = deps.every((item, index) => item === lastDeps[index])
        if(same){ // 如果老的依赖和新的依赖都相同，则直接返回老的，如果不相同返回新的
            hookIndex++
            return memo
        } else {
            let newMemo = factory()
            hookStates[hookIndex++] = [newMemo, deps]
            return newMemo
        }
    } else {
        let newMemo = factory()
        hookStates[hookIndex++] = [newMemo, deps]
        return newMemo
    }
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
class PureComponent extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(Object.is(nextProps, this.props) || Object.is(nextState, this.state))
    }
}
function memo(OldComponent){
    return class extends PureComponent{

        render() {
            return <OldComponent {...this.props}/>
        }
    }
}
let MemoChild = React.memo(Child)

function App() {
    // 如果一旦进入函数组件，索引先归0
    // 每调用一个hook 索引+1
    let [number, setNumber] = useState(0)
    let [name, setName] = useState('liu')
    const handleClick = useCallback(()=> setNumber(number+1), [number])
    // useMemo 缓存函数的返回值 {number: 0}
    // 第二个参数是依赖数组，依赖变化才会重新计算number值 空数组则意味着不依赖任何变量
    const data = useMemo(()=>({number}), [number])

    return (
        <div>
            <input type="text" value={name} onChange={event =>setName(event.target.value)}></input>
            <MemoChild handleClick={handleClick} data={data}/>
        </div>
    )
}
function render(){
    hookIndex = 0
    ReactDOM.render(<App></App>, document.getElementById('root'))
}

render()


