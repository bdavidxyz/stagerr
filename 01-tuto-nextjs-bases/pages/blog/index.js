import Header from "@/components/Header"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Blog(){

    const [articles, setArticles] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        const getArticles = async () => {
            const res = await fetch("/api/blog/posts")
            const posts = await res.json()
            setArticles(posts)
            setLoad(true)
        }
        getArticles()
    },[])

    return(
        <div>
            <Header />
            <div>
                <h1>Blog</h1>
                <ul>
                    {
                        articles.map((post, index)=>{
                            return <li key={index}><Link href={`/blog/${post.slug}`}>{post.titre}</Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}