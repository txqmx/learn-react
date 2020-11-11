// 核心库，与渲染平台无关
import React from 'react'
// 渲染库 可以把react渲染到不同的平台上 react-dom react-native react-canvas
import ReactDOM from 'react-dom'

/*
* 组件
* 1. 函数式组件 就是一个函数，接收一个props或者说属性对象，返回一个react元素
*   1. 创建或组装props对象  = {name: 'xxx'}
*   2. 把这个props对象传入函数，得到一个返回值 react元素
* */

// function Welcome(props) {
//     return <h1>hello, {props.name}</h1>
// }
// ReactDOM.render(<Welcome name="liusinan"/>, document.getElementById('root'))

/*
* 2. 类组件 可以通过类来定义组件
*   1. 需要继承自react.component
*   2. 需要实现一个render方法，方法名是定死的，方法返回一个React元素
*
* 为了区分是自定义组件还是原生组件（h1 span）
* 自定义组件首字母大写，原生组件首字母小写
* 自定义组件在使用前必须要先定义，再使用
*
* 函数组件的返回值和类组件render方法的返回值必须返回一个并且只能返回一个顶级React元素
* 可以使用<></> 是<React.Fragment> 的语法糖
* */

// class Welcome extends React.Component{
//     // 函数式组件没有生命周期，配合hooks实现类组件的功能
//     // 构造函数只会创建类组件实例的时候调用，更新的时候不会调用
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <h1>hello, {this.props.name}</h1>
//     }
// }
//
// ReactDOM.render(<Welcome name="liusinan"/>, document.getElementById('root'))

/*
* 函数式组件和类组件的优缺点
*
* 1. 类组件的性能消耗比较大，因为类组件需要创建类组件的实例，而且不能销毁
* 2. 函数组件性能消耗小，因为函数组件不需要创建实例，渲染的时候就执行一下，得到返回的React元素后就直接把中间变量全部销毁
*
* 函数组件再以前不能有状态，但是现在有了react hooks也可以有状态了，现在越来越拥抱函数组件了
* 能用函数解决就不用类
*
* */


/*
* 组件的拆分 什么时候需要拆分呢
* 1. 组件的UI被大量复用
* 2. 组件太复杂了
*
* */

// class PanelHead extends React.Component{
//     render() {
//         return (
//             <div className='panel-head'>头部</div>
//         )
//     }
// }
// class PanelBody extends React.Component{
//     render() {
//         return (
//             <div className='panel-body'>主体</div>
//         )
//     }
// }
// class PanelFooter extends React.Component{
//     render() {
//         return (
//             <div className='panel-footer'>尾部</div>
//         )
//     }
// }
//
// class Panel extends React.Component{
//     render() {
//         return (
//             <div className='panel'>
//                 <PanelHead/>
//                 <PanelBody/>
//                 <PanelFooter/>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(<Panel name="liusinan"/>, document.getElementById('root'))


/*
* 属性具有只读性
* 1. 属性是由父组件传入的，不能修改
* 2.不管是类组件还是函数组件都不能修改自己的props
*
*
* 什么叫纯函数
* 1. 不能修改传入的参数
* 2. 不能修改函数作用域外的变量
* 3. 如果参数相同，返回值也一定相同
* */


/*
* 类型检查
* 1. 要在组件的props 上进行类型检查，只需要配置特定的propTypes属性就可以了
*
* */

import PropTypes from 'prop-types'

class Person extends React.Component{
    static defaultProps = { // 当用户使用的时候没有提供这个属性，那么默认属性就会起作用
        name: '陌生人'
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        gender: PropTypes.oneOf(['male', 'famale']),
        position: PropTypes.shape({
            x:PropTypes.number,
            y:PropTypes.number
        }),
        age(props, propName, componentName){ // 自定义校验
            let age = props[propName]
            if(age<0 || age>120){
                return new Error(`Invalid Prop ${propName} of value ${age} supplied to ${componentName}, expected age between 0 and 120` )
            }
        }
    }
    render() {
        let {name, age, gender, hobbies, position} = this.props
        return (
            <table>
                <thead>
                    <tr>
                        <td>姓名</td>
                        <td>年龄</td>
                        <td>性别</td>
                        <td>爱好</td>
                        <td>位置</td>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{hobbies.join(',')}</td>
                    <td>{position.x + ',' + position.y}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}

let props = {name: 'lalala', age: 130, gender: 'male', hobbies: ['smoking', 'drinking'], position: {x:10, y:20}}

ReactDOM.render(<Person {...props}/>, document.getElementById('root'))

class A {
    constructor(props) {
        this.props = props
    }
}

class B extends A{
    constructor(props) {
        super(props);
    }
}
let b = new B({name: 'xxx'})
console.log(b.props.name);
