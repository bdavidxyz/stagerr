// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const {slug} = req.query
    if(req.method === "GET"){
        const data = [
            {
                slug: "article-numero-1",
                titre: "Article N°1",
                content: "Contenu de l'article 1."
            },
            {
                slug: "article-numero-2",
                titre: "Article N°2",
                content: "Contenu de l'article 2."
            },
            {
                slug: "article-numero-3",
                titre: "Article N°3",
                content: "Contenu de l'article 3."
            },
        ]
        res.status(200).json(data.filter((post)=> post.slug == slug));
    }else{
        res.status(500).json({ message: "Method Not Allowed" });
    }
}
