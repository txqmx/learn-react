// import React from './react'
// import ReactDOM from './react-dom'
import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component{
    static defaultProps = { // 初始化默认属性对象
        name: '珠峰架构'
    }
    constructor(props) {
        super(props);
        this.state = {number: 0} // 初始化状态对象
        console.log('Counter 1.初始化状态对象');
    }
    componentWillMount() {
        console.log('Counter 2.组件将要挂载 componentWillMount');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('Counter 5.询问用户组件是否需要更新 shouldComponentUpdate');
        // return nextState.number%2 === 0
        return true
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('Counter 6.组件将要更新 componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Counter 7.组件更新完成 componentDidUpdate');
    }

    handleClick = (event) => {
        this.setState({number: this.state.number + 1})
    }
    componentDidMount() {
        console.log('Counter 4.组件挂载完成 componentDidMount');
    }

    render(){
        console.log('Counter 3.render 通过调用render方法获取虚拟dom');
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
                {
                    this.state.number>3?null:<ChildCounter count={this.state.number}></ChildCounter>
                }
            </div>
        )
    }
}

class ChildCounter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {number: 0}
    }
    componentWillMount() {
        console.log('ChildCounter 1.组件将要挂载 componentWillMount');
    }
    componentDidMount() {
        console.log('ChildCounter 3.挂载完成 componentDidMount');
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('ChildCounter 4.组件是否更新 shouldComponentUpdate');
        // return nextProps.count%3===0
        return true
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('ChildCounter 5.组件将要更新 componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('ChildCounter 6.组件更新完成 componentDidUpdate');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // 以前很多人在这里通过props修改状态， 会在这里调用setState()很可能引起死循环
        console.log('ChildCounter 7.组件接收到新的属性 componentWillReceiveProps');
    }
    componentWillUnmount() {
        console.log('ChildCounter 8.组件将要卸载 componentWillUnmount');
    }
    // 根据新的属性对象得到新的状态对象，他是一个静态方法，只能通过类来调用，不能通过实例来调用
    static getDerivedStateFromProps(nextProps, prevState){
        const {count} = nextProps // 先从新的属性对象中获取新的count值
        // 如果返回了一个对象，那么就把这个对象当成状态对象，如果返回一个null，则保留原状态
        if(count%2 === 0){
            return {number: count*2}
        }else {
            return {number: count*3}
        }
    }
    render() {
        console.log('ChildCounter 2.挂载 render');
        return (<div>{this.state.number}</div>)
    }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'))
