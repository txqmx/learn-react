import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component{
    constructor(props) {
        super(props) // this.props = props
        // 构造函数式唯一能直接给this.state赋值的地方，其他地方想要改变状态都要调用setState
        this.state = {name: '计数器', number: 0} // 在构造函数中定义状态对象
    }

    // react 事件和生命周期函数中更新是批量的，或者是异步的
    // 在setTimeout 原生事件是同步的
    handleClick = (event) => {
        this.setState({number: this.state.number+1})
        console.log(this.state.number); // 0
        this.setState({number: this.state.number+1})
        console.log(this.state.number); // 0
        this.setState(prevState =>({number: prevState.number+1}))
        console.log(this.state.number); // 0
        setTimeout(() => {
            this.setState({number: this.state.number+1})
            console.log(this.state.number); // 2 3
        },1000)
    }

    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'))
