import React from './react'
import ReactDOM from './react-dom'
// import React from 'react'
// import ReactDOM from 'react-dom'

let ThemeContext = createContext()

function createContext() {
    function Provider(props) {
        Provider._value = props.value
        return props.children
    }
    function Consumer(props) {
        return props.children(Provider._value)
    }
    return {
        Provider,
        Consumer
    }
}

// 函数组件的写法
function GrandSon1(props) {
    return (
        <ThemeContext.Consumer>
            {
                value => (
                    <div style={{margin: '10px', border: `5px solid ${value.color}`, padding: '5px', width: '200px'}}>
                        GrandSon1
                    </div>
                )
            }
        </ThemeContext.Consumer>

    )
}

// class GrandSon1 extends React.Component{
//     // 如果你给一个类组件增加一个静态属性contextType
//     // 那么久可以通过this.context这个属性来获取 Provider里面的value
//     static contextType = ThemeContext
//     render() {
//         return (
//             <div style={{margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px'}}>
//                 GrandSon1
//             </div>
//         )
//     }
// }
class GrandSon2 extends React.Component{
    static contextType = ThemeContext
    render() {
        return (
            <div style={{margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px'}}>
                GrandSon2
                <button onClick={() => this.context.changeColor('red')}>变红</button>
                <button onClick={() => this.context.changeColor('green')}>变绿</button>
            </div>
        )
    }
}

class Child1 extends React.Component{
    static contextType = ThemeContext
    render() {
        return (
            <div style={{margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px'}}>
                Child1
                <GrandSon1/>
            </div>
        )
    }
}
class Child2 extends React.Component{
    static contextType = ThemeContext
    render() {
        return (
            <div style={{margin: '10px', border: `5px solid ${this.context.color}`, padding: '5px', width: '200px'}}>
                Child2
                <GrandSon2/>
            </div>
        )
    }
}

class Page extends React.Component{
    constructor(props) {
        super(props);
        this.state = { color: 'red'}
    }
    changeColor = (color) =>{
        this.setState({color})
    }
    render() {
        let value = {
            color: this.state.color,
            changeColor: this.changeColor
        }
        return (
            <ThemeContext.Provider value={value}>
                <div style={{margin: '10px', border: `5px solid ${this.state.color}`, padding: '5px', width: '200px'}}>
                    <Child1/>
                    <Child2/>
                </div>
            </ThemeContext.Provider>
        )
    }
}

ReactDOM.render(<Page></Page>, document.getElementById('root'))
