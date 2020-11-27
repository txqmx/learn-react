// import React from './react'
// import ReactDOM from './react-dom'
import React from 'react'
import ReactDOM from 'react-dom'

/*
* 高阶组件还有一种使用方式，属性代理
* 就是操作属性props
* */

const loading = message => OldComponent => {
    return class extends React.Component{
        render(){
            const state = {
                show: ()=>{
                    let div = document.createElement('div')
                    div.innerHTML = `<p id="loading" style="position: absolute; top:100px; z-index:10; background: red">${message}</p>`
                    document.body.appendChild(div)
                },
                hide: ()=>{
                    document.getElementById('loading').remove()
                }
            }
            return (
                <div>
                    <OldComponent {...this.props} {...state}/>
                </div>
            )
        }
    }
}

function Hello(props){
    return (
        <div>hello
            <button onClick={props.show}>show</button>
            <button onClick={props.hide}>hide</button>
        </div>
    )
}

let LoadingHello = loading('正在加载')(Hello)

ReactDOM.render(<LoadingHello></LoadingHello>, document.getElementById('root'))
