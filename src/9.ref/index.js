import React from './react'
import ReactDOM from './react-dom'

/*
*  ref 引用
*   refs提供一种允许我们访问dom元素的方式
*   ref值 是一个字符串，此方式已经废弃 ref='a'  let a = this.refs.a.value
*   ref值 是一个函数，此方式已经废弃 ref={xx=>this.a = xx}  let a = this.a.value
*   ref值 是一个对象，催下有一个current属性指向真实的DOM元素
*
* */

class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.a = React.createRef() // {current: null}
        this.b = React.createRef()
        this.result = React.createRef()
    }
    add = (event) => {
        let a = this.a.current.value
        let b = this.b.current.value
        this.result.current.value = a+b
    }
    render() {
        return (
            <div>
                <input ref={this.a}/> + <input ref={this.b}/>
                <button onClick={this.add}> = </button>
                <input ref={this.result}/>
            </div>
        )
    }
}

ReactDOM.render(<Calculator></Calculator>, document.getElementById('root'))
