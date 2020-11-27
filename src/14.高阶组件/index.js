// import React from './react'
// import ReactDOM from './react-dom'
import React from 'react'
import ReactDOM from 'react-dom'

/*
*  高阶组件 对标高阶函数
*  函数可以作为方法的参数和返回值  java里函数是不能作为参数和返回值
*  组件（函数）可以作为方法的参数和返回值
*
*  如果我们想统计每个组件的渲染时间，难道要侵入每个组件吗
* */

// 高阶组件就是一个函数，传进去一个老组件返回一个新组件
function logger1(OldComponent){
    return class extends React.Component{
        componentWillMount() {
            this.start = Date.now()
        }
        componentDidMount() {
            console.log('logger1' + (Date.now() - this.start) + 'ms');
        }
        render() {
            return <OldComponent {...this.props}></OldComponent>
        }
    }
}

function logger2(OldComponent){
    return class extends React.Component{
        componentWillMount() {
            this.start = Date.now()
        }
        componentDidMount() {
            console.log('logger2' + (Date.now() - this.start) + 'ms');
        }
        render() {
            return React.createElement(OldComponent, {...this.props})
            // return <OldComponent {...this.props}></OldComponent>
        }
    }
}

class HelloComponent extends React.Component{
    // componentWillMount() {
    //     this.start = Date.now()
    // }
    // componentDidMount() {
    //     console.log((Date.now() - this.start) + 'ms');
    // }

    render() {
        return (
            <div>hello</div>
        )
    }
}

let HighHelloComponent = logger2(logger1(HelloComponent))

ReactDOM.render(<HighHelloComponent></HighHelloComponent>, document.getElementById('root'))

// antdesign Form表单
