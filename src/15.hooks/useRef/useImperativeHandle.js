import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

/*
* useRef 返回一个可变的ref对象 current属性初始化为传入的参数
* 返回的ref对象在组件的整个生命周期内保持不变
* forwardRef
* */

function useImperativeHandle(forwardRef, factory) {
    forwardRef.current = factory()
}

function Child(props, forwardRef){
    const inputRef = React.useRef()
    // 第一个参数是转发的forwardRef对象，第二个是工厂函数，返回一个对象
    useImperativeHandle(forwardRef, () => ({
        focus() {
            inputRef.current.focus()
        }
    }))
    return (
        <div>
            <input type="text" ref={inputRef}/>
            <button onClick={props.getFocus}>获取焦点</button>
        </div>
    )
}

const ForwardedChild = React.forwardRef(Child)

function Parent(){
    let [number, setNumber] = useState(0)
    let inputRef = React.useRef()
    const getFocus = () => {
        inputRef.current.focus() // current 指向useImperativeHandle 第二个函数返回的对象
    }
    return (
        <div>
            <ForwardedChild ref={inputRef} getFocus={getFocus}/>
            <button onClick={() => setNumber(number+1)}>+</button>
        </div>
    )
}

// createRef 是用在类里的 每次都返回新对象，useRef是用在函数里的 每次返回相同的对象
// 如果你把ref 对象赋给原生dom组件，ref.current=真实的dom

// let lastRef
// function useRef(initialRef={current:null}){
//     lastRef = lastRef || initialRef
//     return lastRef
// }



ReactDOM.render(<Parent/>, document.getElementById('root'))


