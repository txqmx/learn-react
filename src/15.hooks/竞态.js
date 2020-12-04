import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

/*
*
* 竞态
* */

const API = {
    async fetchArticleById(id){
        return new Promise(function (resolve) {
            setTimeout(() => {
                resolve({id, title: `title_${id}`})
            },1000*(5-id))
        })
    }
}

function Article(props) {
    let {id} = props
    let [article,setArticle] = useState({})
    useEffect(() => {
        let didCancel = false; // 此请求是否已取消
        (async function fetchData() {
            const article = await API.fetchArticleById(id)
            if(!didCancel)
            setArticle(article)
        })()
        return () => {
            didCancel = true
        }
    }, [id])
    return (
        <div>
            <p>{article.title}</p>
        </div>
    )
}

function Page(){
    let [id, setId] = useState(1)
    return (
        <div>
            <p>id:{id}</p>
            <Article id={id}/>
            <button onClick={() => setId(id+1)}>改变ID</button>
        </div>
    )

}

ReactDOM.render(<Page/>, document.getElementById('root'))


