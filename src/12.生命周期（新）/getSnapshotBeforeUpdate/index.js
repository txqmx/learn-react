import React from './react'
import ReactDOM from './react-dom'
// import React from 'react'
// import ReactDOM from 'react-dom'

class ScrollList extends React.Component{
    constructor(props) {
        super(props);
        this.wrapper = React.createRef()
        this.state = {messages: []}
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                messages: [ `${this.state.messages.length}`, ...this.state.messages]
            })
        }, 1000)
    }
    // 这个方法是在重新渲染之前触发的，可以获取到老的dom状态
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return {
            preScrollTop: this.wrapper.current.scrollTop, // 老的卷去的高度
            preScrollHeight: this.wrapper.current.scrollHeight // 老的内容的高度
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let {preScrollTop, preScrollHeight} = snapshot
        let wrapper = this.wrapper.current
        wrapper.scrollTop = preScrollTop + (wrapper.scrollHeight - preScrollHeight)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        let styleObj = {
            height: '100px',
            width: '200px',
            border: '1px solid red',
            overflow: 'auto'
        }
        return (
            <div style={styleObj} ref={this.wrapper}>
                {
                    this.state.messages.map((message, index) => (
                        <div key={index}>{message}</div>
                        ))
                }
            </div>
        )
    }
}

ReactDOM.render(<ScrollList></ScrollList>, document.getElementById('root'))
