import React from 'react'
import ReactDOM from 'react-dom'

//
// // jsx
// let element = <h1>hello</h1>
// // babel会转译
// let element = React.createElement('h1', null, 'hello')
// // 代码在浏览器中执行
// function createElement() {
//     return {type: 'h1', props: {children: 'hello'}}
// }

/*
* 组件的状态和事件处理
* 属性和状态都是组件的数据源
* 属性：是父组件传入的，自己不能改
* 状态：是自己内部定义的，自己可以改
*
* 1. 永远不要直接修改this.state，因为直接修改的化组件不会刷新
* 2. 状态的更新可能是异步，出于性能考虑，react可能把多个setState合并成同一个
* 3. 状态的更新会被合并
*   1. 传的对象是增量对象，如果增加量对象的属性老的里面没有，则会添加
*   2. 如果老状态里面有，则会覆盖
*   3. 如果老状态里有，新的增量对象没有，保留老状态的值
*   4. 状态的合并，不能删除老的状态值
* */

class Counter extends React.Component{
    constructor(props) {
        super(props) // this.props = props
        // 构造函数式唯一能直接给this.state赋值的地方，其他地方想要改变状态都要调用setState
        this.state = {name: '计数器', number: 0} // 在构造函数中定义状态对象
    }
    // 组件挂载完成 把虚拟dom转换成真实dom 并且挂载到dom节点之后会执行此方法 生命周期函数
    // componentDidMount() {
    //     // 在组件挂载完成后悔启动一个定时器，每隔一秒钟改变一下状态
    //     // setState可以修改状态，可以让组件自动刷新
    //     this.timer = setInterval(() => {
    //         this.setState({number: this.state.number+1})
    //     }, 1000)
    // }
    //
    // // 组件卸载之前，清除定时器
    // componentWillUnmount() {
    //     clearInterval(this.timer)
    // }

    handleClick = (e) => {
        // 在事件处理函数中，setState的更新会被合并，也就是说调了setState之后不会立刻修改this.state，this.state还会保留原值
        // this.setState({number: this.state.number+1})
        // this.setState({number: this.state.number+1})

        // 如果你想依赖上一个状态计算下一个状态的话，需要给setState传一个函数
        // this.setState(prevState => ({number: prevState.number+1}))
        // this.setState(prevState => ({number: prevState.number+1}))


        // this.setState({number: this.state.number+1})
        // console.log('handleClick1', this.state.number); // 0
        // this.setState({number: this.state.number+1})
        // console.log('handleClick2', this.state.number); // 0
        // setTimeout(() => {
        //     this.setState({number: this.state.number+1})
        //     console.log('setTimeout1', this.state.number); // 2
        // }, 1000)
        // setTimeout(() => {
        //     // 在setTimeout 里面会直接更新
        //     this.setState({number: this.state.number+1})
        //     console.log('setTimeout2', this.state.number); // 3
        // }, 3000)

        this.setState({number: this.state.number+1}, () => {
            this.setState({number: this.state.number+1})
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.name}</p>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'))
