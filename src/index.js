import React from './react'
import ReactDOM from './react-dom'

let element = React.createElement('h1', {className: 'title', style: {color: 'red'}},
    React.createElement('span', null, 'hello'),
    'world'
);

console.log(element);
ReactDOM.render(element, document.getElementById('root'))
