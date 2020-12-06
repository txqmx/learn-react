import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'


// function useEffect(callback, deps) {
//     // 直接把callback放到宏任务队列去
//     setTimeout(callback)
// }
//
// function useLayoutEffect(callback, deps) {
//     // 直接把then的回调放到一个微任务里，会在页面渲染或绘制前执行
//     Promise.resolve().then(callback)
// }


const Animate = ()=>{
    const ref = useRef()
    // 渲染前执行
    useLayoutEffect(() => {
        ref.current.style.WebkitTransform = 'translate(500px)'
        ref.current.style.transition = 'all 500ms'
    })
    // 渲染后执行
    // useEffect(() => {
    //     ref.current.style.WebkitTransform = 'translate(500px)'
    //     ref.current.style.transition = 'all 500ms'
    // })
    let styleObj = {
        width: '100px',
        height: '100px',
        backgroundColor: 'red'
    }
    return (
        <div>
            <div style={styleObj} ref={ref}></div>
        </div>
    )
}

ReactDOM.render(<Animate/>, document.getElementById('root'))


