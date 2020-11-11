// 核心库，与渲染平台无关
import React from 'react'
// 渲染库 可以把react渲染到不同的平台上 react-dom react-native react-canvas
import ReactDOM from 'react-dom'

// 把h1渲染到root上
// 一般js里不能写html标签，react JSX语法js+html混合写法
// jsx浏览器无法识别，需要经过babel的转义，转成es5从而在浏览器运行
// cra 内置webpack，里面配置babel-loader 可以实现对jsx的转义

let element1 = <h1 id='title'><span>hello</span>world</h1>
let element2 = React.createElement("h1", {
    id: "title"
}, React.createElement("span", null, "hello"), "world");

// createElement 会返回一个对象，这个对象被称为react元素，也被称为虚拟dom

console.log(element1, element2); // 虚拟dom
ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))
// render 时将虚拟dom变为真实的dom
