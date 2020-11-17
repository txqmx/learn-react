
import {updateQueue} from './Component.js'


/*
* 绑定事件
* 在React不是直接绑定的，而是采用一种合成事件的方式来处理的，是事件委托
* @param {*} dom button 要绑定的事件的真实DOM元素
* @param {*} eventType onclick 绑定事件的类型
* @param {*} listener 事件回调函数 handleClick
*
* */
export function addEvent(dom, eventType, listener) {
    // dom[eventType] = listener 直接绑定
    // 在dom元素上会保存一个对象
    let store = dom.store || (dom.store = {})
    // button.store.onclick = listener
    store[eventType] = listener
    // document.addEventListener('on', 事件处理函数, 是否冒泡阶段捕获)
    // 事件委托，不管给哪个DOM绑定事件，都会绑定到document上
    document.addEventListener(eventType.slice(2), dispatchEvent, false)

}

/*
* 1.为了实现合成事件
*   1. 为了性能，快速回收event对象
*   2. 为了兼容性，屏蔽浏览器差异
*   3. 为了实现批量更新
* @param {*} event
* */

// 合成事件对象
let syntheticEvent = {}

function dispatchEvent(event) { // event 原生的事件对象
    let {target, type} = event // target dom元素， type就是click
    let eventType = 'on' + type // onclick

    let listener = target.store && target.store[eventType] // listener handleClick
    if(listener) {
        // 让合成事件的原生事件指向真实的事件对象
        syntheticEvent.nativeEvent = event
        for(let key in event){
            syntheticEvent[key] = event[key]
        }
        // 进入批量更新模式 不会直接更新
        updateQueue.isBatchingUpdate = true
        listener.call(null, syntheticEvent)
        // 退出批量更新模式，进入直接同步更新模式
        updateQueue.isBatchingUpdate = false
        for(let key in event){
            syntheticEvent[key] = null // 垃圾回收
        }
    }

}
