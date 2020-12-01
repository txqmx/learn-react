import React, {useState} from 'react'
import ReactDOM from 'react-dom'

/*
* hooks其实很多，核心的有两个
* useState 重要但是简单
* useEffect useLayoutEffect 非常重要，但是很难用好
*
* */

function Counter(props) {
    let [state, setState] = useState(0)
    // 这是一个钩子，他会在每次页面渲染后指向，包括首次渲染和每次更新结束
    React.useEffect(() => {
        // document.title = state
        let timer = setInterval(() => {
            setState(state => state+1)
        }, 1000)
        // 被称为销毁函数，会在每次重新执行函数前执行
        return () => {
            clearInterval(timer)
        }
    },[]) // 如果依赖改变会重新执行effect函数，如果依赖没就不更新
    // componentDidMount(){
    //     document.title = state
    // }
    // componentDidUpdate(){
    //     document.title = state
    // }
    // componentWillUnmount(){
    //     document.title = state
    // }
    return (
        <div>
            <p>{state}</p>
            <button onClick={() => setState(state+1)}>+</button>
        </div>
    )
}

function render(){
    ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()


