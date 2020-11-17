// 定义并导出一个变量
export let updateQueue = {
    // 是否处于批量更新模式
    isBatchingUpdate: false
}
class Component {
    constructor(props) {
        this.props = props
    }
}

Component.prototype.isReactComponent = {} // 用来判断函数组件还是类组件

export default Component
