import {addEvent} from "./event";

/*
* 把虚拟dom转成真DOM并且插入到parentDOM里面
* @param {*} vdom 虚拟dom react元素 也就是一个js对象
* @param {*} parentDOM 真实DOM
*
* */
function render(vdom, parentDOM) {
    let dom = createDOM(vdom)
    parentDOM.appendChild(dom)
}

/*
* 把一个虚拟DOM换成真实DOM并插入到页面中去
* @param {*} vdom
*
* */
export function createDOM(vdom) {
    if(typeof vdom === 'string' || typeof vdom === 'number'){
        return document.createTextNode(vdom)
    }
    let {type, props, ref} = vdom  // h1 props={className, style, children}
    let dom = ''
    if(typeof type === 'function'){
        return type.prototype.isReactComponent? updateClassComponent(vdom) : updateFunctionComponent(vdom)
    }else { // 如果类型是一个普通的字符串，说明是一个原生的虚拟Dom节点，比如h1 span div
        dom = document.createElement(type) // 创建一个h1的真实dom
    }


    updateProps(dom, props)
    if(typeof props.children === 'string' || typeof props.children === 'number'){
        dom.textContent = props.children
        // 如果儿子是一个对象（虚拟dom）并且不是数组
    } else if (typeof props.children === 'object' && props.children.type){
        render(props.children, dom)
    } else if(Array.isArray(props.children)) { // 是数组
        reconcileChildren(props.children, dom)
    } else {
        dom.textContent = props.children ? props.children.toString() : ''
    }
    if(ref){
        ref.current = dom
    }

    return dom
}

function updateFunctionComponent(vdom) {
    let {type,props} = vdom
    let renderVirtualDOM = type(props) // type=FunctionComponent
    return createDOM(renderVirtualDOM)
}

function updateClassComponent(vdom) {
    let {type:ClassComponent,props, ref} = vdom
    let classInstance = new ClassComponent(props)
    if(classInstance.componentWillMount){
        classInstance.componentWillMount() // 在挂载前调用componentWillMount
    }
    if(ClassComponent.contextType){
        classInstance.context = ClassComponent.contextType.Provider._value
    }
    if(ref){
        ref.current = classInstance
    }
    let renderVirtualDOM = classInstance.render() // type=FunctionComponent
    let dom = createDOM(renderVirtualDOM)
    // 在实例身上挂一个属性dom，指向此类实例对应的真实dom
    classInstance.dom = dom

    if(classInstance.componentDidMount){
        classInstance.componentDidMount() // 挂载完
    }
    return dom
}

/*
* 处理儿子
* @param {*} children
* @param {*} parentDOM
*
* */
function reconcileChildren(children, parentDOM) {
    // 把每个儿子都从虚拟dom变成真实dom并插入到父节点中去
    for(let i=0; i<children.length; i++){
        render(children[i], parentDOM)
    }
}


/*
* 把props上的属性赋值给真实dom元素，此方法不支持children
* @param {*} dom 真实dom
* @param {*} props 属性对象
*
* */

function updateProps(dom, props) {
    for(let key in props){
        if(key === 'children'){continue}
        if(key === 'style'){
            let style = props[key] // {color: red}
            for(let attr in style){
                dom.style[attr] = style[attr]
            }
        }else if(key.startsWith('on')){
            // dom=button onclick handClick
            addEvent(dom, key.toLocaleLowerCase(), props[key])

        }else {
            dom[key] = props[key]
        }
    }
}

export default {
    render
}
