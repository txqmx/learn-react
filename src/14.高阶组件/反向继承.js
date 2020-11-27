// import React from './react'
// import ReactDOM from './react-dom'
import React from 'react'
import ReactDOM from 'react-dom'

/*
*  反向继承
*  应用场景 开发一堆button 特点是初始值为0， 每次点击后+1
*
*  反向继承的两大作用
*  1. 渲染劫持
*  2. 操作state
* 注意 state props也会被覆盖
*
* HOC 父componentWillMount 子componentWillMount  子componentDidMount 父componentDidMount
* 反向 子子componentWillMount 父子componentWillMount 子子componentDidMount 父子componentDidMount
*
* 反向继承先子类再父类
* 反向继承也是靠高阶组件实现的
* */

class Button extends React.Component{
    componentDidMount() {
        console.log('Button componentDidMount');
    }
    render() {
        console.log('Button render');
        return <button></button>
    }
}
const wrapper = OldComponent => {
    return class extends OldComponent{
        state = {number:0}
        componentDidMount() {
            console.log('wrapperButton componentDidMount');
            super.componentDidMount()
        }
        handleClick =()=> {
            this.setState({number: this.state.number + 1})
        }
        render(){
            console.log('wrapperButton render');
            let renderElement = super.render() // s是一个空button
            let newProps = {
                ...renderElement.props,
                onClick: this.handleClick
            }
            return React.cloneElement(
                renderElement,
                newProps,
                this.state.number
            )
        }
    }
}

let WrappedButton = wrapper(Button)

ReactDOM.render(<WrappedButton></WrappedButton>, document.getElementById('root'))
