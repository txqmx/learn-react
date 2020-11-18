import React from 'react'
import ReactDOM from 'react-dom'

/*
* 事件 和 ref
*   dom onclick  React onClick
*   jsx
*
*   this 如何绑定
*   1. 箭头函数 (推荐)
*   2. bind(this)
*   3. 可以用匿名函数，传参只能使用匿名函数
* */

class Link extends React.Component{
    /*
    * @param {*} event 合成事件对象 把所以的事件监听都合并在一起 dispatchEvent
    * 1. 为了提高性能
    * 2. 为兼容不同的浏览器，让我们可以使用一个标准api来处理
    * */
    handleClick = (event)=>{
        console.log(event, this);
        // event.preventDefault() // 阻止冒泡事件
    }
    handleClick1(event){
        console.log(event, this);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>箭头函数</button>
                <button onClick={event => this.handleClick1(event)}>匿名函数</button>
                <button onClick={this.handleClick1.bind(this)}>bind(this)</button>
            </div>
        )
    }
}

ReactDOM.render(<Link></Link>, document.getElementById('root'))
