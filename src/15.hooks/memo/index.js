import React from 'react'
// import React, {useState} from 'react'
import ReactDOM from 'react-dom'

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
    let [number, setNumber] = React.useState(0)
    let [name, setName] = React.useState('liu')
    const handleClick = React.useCallback(()=> setNumber(number+1), [number])
    // const data = {number}
    // useMemo 缓存函数的返回值 {number: 0}
    // 第二个参数是依赖数组，依赖变化才会重新计算number值 空数组则意味着不依赖任何变量
    const data = React.useMemo(()=>({number}), [number])

    return (
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <button onClick={() => setNumber(number+1)}>+</button>
            <MemoChild handleClick={handleClick} data={data}/>
        </div>
    )
}
function render(){
    ReactDOM.render(<App></App>, document.getElementById('root'))
}

render()


