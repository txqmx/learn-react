import Component from "./Component";

/*
* @param {*} type 元素类型
* @param {*} config 配置对象
* @param {*} children 准确的说是第一个儿子，无儿子就是undefined
*
* */

function createElement(type, config, children) { // ...children 都是数组
    let ref
    if(config){
        delete config.__source
        delete config.__self
        ref = config.ref
    }
    let props = {...config}
    // 如果没有儿子 undefined 一个儿子就是对象 字符串 元素 如果多个儿子就是一个数组
    if(arguments.length > 3){
        children = Array.prototype.slice.call(arguments, 2)
    }
    props.children = children
    return {
        type, props, ref
    }
}

function createRef() {
    return {
        current: null
    }
}

function forwardRef(FunctionComponent) {
    return class extends Component{
        render(){
            return FunctionComponent(this.props, this.props.ref)
        }
    }
}

export default {
    createElement,
    Component,
    createRef,
    forwardRef
}
