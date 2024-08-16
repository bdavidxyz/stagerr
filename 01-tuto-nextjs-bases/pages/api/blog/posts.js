// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    if(req.method === "GET"){
        res.status(200).json([
            {
                slug: "article-numero-1",
                titre: "Article N°1"
            },
            {
                slug: "article-numero-2",
                titre: "Article N°2"
            },
            {
                slug: "article-numero-3",
                titre: "Article N°3"
            },
        ]);
    }else{
        res.status(500).json({ message: "Method Not Allowed" });
    }
}
