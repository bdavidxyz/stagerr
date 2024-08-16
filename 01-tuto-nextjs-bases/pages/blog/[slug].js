import Header from "@/components/Header"

export default function Single({titre, content}){
    return(
        <div>
            <Header />
            <h1>{titre}</h1>
            <p>{content}</p>
        </div>
    )
}

export async function getStaticProps({params}){
    const { slug } = params
    const res = await fetch(`http://localhost:3000/api/blog/post?slug=${slug}`)
    const post = await res.json()

    return {
        props: {
            titre: post[0].titre,
            content: post[0].content
        }
    }
}

export async function getStaticPaths(){
    const res = await fetch("http://localhost:3000/api/blog/posts")
    const posts = await res.json()

    const paths = posts.map(post => ({
        params: { slug: post.slug }
    }))

    return { paths, fallback: false}
}