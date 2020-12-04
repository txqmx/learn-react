import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

/*
*
* setState是同步还是异步
*
* 异步，批量更新
* */

function Counter() {
    const [state, setState] = useState(0);
    const handleClick = () => {
        setState(state+1)
        setState(state+2)
        setState(state => state+3)
        setState(state+4)
        console.log(state); // 0
    }

    return (
        <div>
            <p>{state}</p>
            <button onClick={handleClick}>+</button>
        </div>
    )
}

function render(){
    ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()


