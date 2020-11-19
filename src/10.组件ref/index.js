import React from './react'
import ReactDOM from './react-dom'

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.classInput = React.createRef()
    }
    getFocus = (event) => {
        // this.classInput.current.getFocus()
        this.classInput.current.focus()
    }
    render() {
        // TextInput类的实例创建出来之后赋给this.classInput.current
        return (
            <div>
                <ForwardedTextInput ref={this.classInput}/>
                <button onClick={this.getFocus}>获取焦点</button>
            </div>
        )
    }
}

// class TextInput extends React.Component{
//     constructor(props) {
//         super(props);
//         this.input = React.createRef()
//     }
//     getFocus(){
//         this.input.current.focus()
//     }
//     render() {
//         return (
//             <input ref={this.input}></input>
//         )
//     }
// }

/*
* 函数组件没有ref
* */
// function TextInput(){
//     return <input/>
// }
const ForwardedTextInput = React.forwardRef((props, ref) => {
    return <input ref={ref}/>
})

ReactDOM.render(<Form></Form>, document.getElementById('root'))
