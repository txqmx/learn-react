import {isFunction} from "./utils";
import {createDOM} from './react-dom'
// 定义并导出一个变量
export let updateQueue = {
    updaters: [], // 更新器的数组，默认是一个空数组
    // 是否处于批量更新模式
    isBatchingUpdate: false,
    add(updater){
        this.updaters.push(updater)
    },
    // 先通过add方法添加updater，然后在合适的时候回调用这个批量更新的方法，一次性更新updater
    batchUpdate(){
        this.isBatchingUpdate = true
        // 把数组中的updaters全部取出，进行批量更新或者说全量更新
        this.updaters.forEach(updater => updater.updateComponent())
        this.updaters.length = 0
        this.isBatchingUpdate = false // 设置为非批量更新模式
    }
}
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance
        this.pendingStates = [] // 这是一个数组，用来缓存所有状态
    }
    addState(partialState){
        // 先把分状态或者更新函数房子数组里进行缓存
        this.pendingStates.push(partialState)
        // 判断是否处于批量更新模式，如果是的话则先添加更新队列里等待更新
        // 否则说明处于非批量更新(同步)，直接更新
        updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent()
    }
    // 让组件进行更新
    updateComponent(){
        let {classInstance, pendingStates} = this // updater里的类组件实例和数组中的状态
        if(pendingStates.length>0){ // 如果有新状态，则需要更新，否则不更新
            // 从pendingStates中得到新的状态
            classInstance.state = this.getState()
            // 然后要重新渲染，进行更新
            classInstance.forceUpdate()
        }
    }
    getState(){
        let {classInstance, pendingStates} = this // updater里的类组件实例和数组中的状态
        let {state} = classInstance // 组件实例中的老状态
        let nextState =  pendingStates.reduce((nextStates, partialState) => {
            if(isFunction(partialState)){
                nextStates = partialState(nextStates)
            } else {
                nextStates = {...nextStates, ...partialState}
            }
            return nextStates
        }, state)
        pendingStates.length = 0
        return nextState
    }
}

class Component {
    constructor(props) {
        this.props = props
        this.state = {}
        this.$updater = new Updater(this)
    }
    // 只放更新状态
    setState(partialState){
        this.$updater.addState(partialState)
    }
    // 让这个组件的状态改变后，重新render，得到新的虚拟dom，然后从新的虚拟dom得到真实dom
    forceUpdate(){
        let newVdom = this.render()
        let newDom = createDOM(newVdom)
        let oldDom = this.dom
        oldDom.parentNode.replaceChild(newDom, oldDom)
        this.dom = newDom
    }

}

Component.prototype.isReactComponent = {} // 用来判断函数组件还是类组件

export default Component
