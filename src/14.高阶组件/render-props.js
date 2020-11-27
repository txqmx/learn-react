// import React from './react'
// import ReactDOM from './react-dom'
import React from 'react'
import ReactDOM from 'react-dom'

// 我们有很多的div或者页面，都要去显示
class MouseTracker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {x:0, y:0}
    }
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                {/*{this.props.children(this.state)}*/}
                {this.props.render(this.state)}
            </div>
        )
    }
}

function withTracker(OldComponent){
    return class MouseTracker extends React.Component{
        constructor(props) {
            super(props);
            this.state = {x:0, y:0}
        }
        handleMouseMove = (event) => {
            this.setState({
                x: event.clientX,
                y: event.clientY
            })
        }
        render() {
            return (
                <div onMouseMove={this.handleMouseMove}>
                    <OldComponent {...this.state}/>
                </div>
            )
        }
    }
}

function show(props){
    return (
        <>
            <h1>请移动鼠标</h1>
            <p>当前鼠标的位置是: x:{props.x} y:{props.y}</p>
        </>
    )
}

// ReactDOM.render(
//     <MouseTracker>{
//         props => (
//             <>
//                 <h1>请移动鼠标</h1>
//                 <p>当前鼠标的位置是: x:{props.x} y:{props.y}</p>
//             </>
//         )
//     }</MouseTracker>, document.getElementById('root'))

// ReactDOM.render(
//     <MouseTracker render={
//         props => (
//             <>
//                 <h1>请移动鼠标</h1>
//                 <p>当前鼠标的位置是: x:{props.x} y:{props.y}</p>
//             </>
//         )
//     }/>, document.getElementById('root'))

let HighShow = withTracker(show)

ReactDOM.render(<HighShow></HighShow>, document.getElementById('root'))
