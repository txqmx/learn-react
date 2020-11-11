// 核心库，与渲染平台无关
import React from 'react'
// 渲染库 可以把react渲染到不同的平台上 react-dom react-native react-canvas
import ReactDOM from 'react-dom'

// jsx 表达式
let title = 'hello'
// let element = <h1>{title}</h1>

// jsx 属性
// 开始标签里面被称为react元素的属性，最终会被放到一个对象中去
// config = { className='title' style={color: 'red'} id='title'} class是js的关键字
// jsx更像js，所以里面基本是js写法
// let element = <h1 className='title' style={{color: 'red'}} id='title'>{title}</h1>

// 3. jsx也是一个对象，是一个普通的js对象，所以他可以作为方法的参数和返回值

function hello(name){
    if(name){
        return <h1>hello, {name}</h1>
    }else {
        return <h1>hello, xxx</h1>
    }
}
let element = hello('world')

// 4. 在for中使用
let users = [{id:1, name: 'zhangsan'},{id:2, name: 'lisi'},{id:3, name: 'wangwu'}]
// let elements = []
// for(let i = 0; i<users.length; i++){
//     elements.push(<li>{users[i]}</li>)
// }
// ReactDOM.render(<ul>{elements}</ul>, document.getElementById('root'))
// 常见写法

ReactDOM.render(<ul>{
    users.map(user => <li key={user.id}>{user.name}</li>)
}</ul>, document.getElementById('root'))

setTimeout(() => {
    let users = [{id:2, name: 'lisi'},{id:3, name: 'wangwu'},{id:1, name: 'zhangsan'}]
    ReactDOM.render(<ul>{
        users.map(user => <li key={user.id}>{user.name}</li>)
    }</ul>, document.getElementById('root'))
},5000)

// 5.react中的元素是不可变得，也就是说当元素被创建后，内容和属性是不可变的
// 界面更新的办法就创建新的元素，vue设置监听只会更新改变部分，局部更新，最小部分更新。react需要逐层遍历来找到变化内容。全量比较

/*
*  1. vue是组件化更新，一个值更新，会引起它关联的组件更新，其他组件不受影响，代价是需要监听watcher，优势更新速度快
*  2. react是全量更新，从根节点开始全量比较，该更新更新，不该更新不更新，所有组件都会涉及到，但是不需要watcher，因为如果组件页面的组件太多，一气呵成不合适，
* 所有引入fiber把大的任务拆分成多个小任务，可能暂停恢复执行，放在浏览器空闲的时间执行，这样的话就不会阻塞浏览器优先级比较高的任务，如渲染，响应用户操作
*
* */

