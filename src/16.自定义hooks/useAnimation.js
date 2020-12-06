import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/*
* 自定义hooks 如何实现动画
* */

function useAnimation(baseClassName) {
    let [className, setClassName] = useState(baseClassName)
    let [stage, setStage] = useState('')
    function start() {
        setStage('bigger')
    }
    useEffect(() => {
        if(stage === 'bigger'){
            setClassName(`${baseClassName} ${baseClassName}-bigger`)
        }
    }, [className, stage])
    return [className, start]
}

function App(){
    const [className, start] = useAnimation('circle')
    return (
        <div>
            <div className={className}/>
            <button onClick={start}>变大</button>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))


