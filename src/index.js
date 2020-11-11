import React from './react'
import ReactDOM from './react-dom'

// let element = React.createElement('h1', {className: 'title', style: {color: 'red'}},
//     React.createElement('span', null, 'hello'),
//     'world'
// );

function FunctionComponent(props){
    return (
        <div className='title' style={{color: 'red'}}>
            <span>{props.name}</span>
            {props.children}
        </div>
    )
}

let element1 = <FunctionComponent name='hello'>world</FunctionComponent>
console.log(JSON.stringify(element1, null, 2));

ReactDOM.render(element1, document.getElementById('root'))
