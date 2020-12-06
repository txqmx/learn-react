import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'

/*
* 如何在hooks里实现ajax请求
* 以及自动加载下一页的功能
* */

function useRequest(url) {
    const limit = 5 // 每一页条数
    // 从哪个索引开始取， 偏移量
    let [offset, setOffset] = useState(0)
    let [data, setData] = useState([])
    function loadMore() {
        setData(null)
        fetch(`${url}?offset=${offset}&limit=${limit}`).then(res => {
            return res.json()
        }).then(pageData => {
            setData([...data, ...pageData])
            setOffset(offset+pageData.length)
        })
    }
    // 只执行一次
    useEffect(loadMore, [])
    return [data, loadMore]
}


function App(){
    const [users, loaderMore] = useRequest('http://localhost:8000/api/users')
    if(users === null){
        return <div>加载中...</div>
    }
    return (
        <>
            <ul>
                {users.map((user, index) => <li key={user.id}>{user.id}:{user.name}</li> )}
            </ul>
            <button onClick={loaderMore}>加载下一页</button>
        </>

    )
}

ReactDOM.render(<App/>, document.getElementById('root'))


