import { NextResponse } from "next/server"
import prisma from "@/lib/connect"

export const GET = async (req : Request) => {
    
    try{
        // permet d'extraire les paramètres de recherche (query parameters) de l'URL dans laquelle se trouve la requête req.
        // /api/posts?cat="slug"
        const {searchParams} = new URL(req.url)
        const catSlug = searchParams.get("cat")
        

        const posts = await prisma.post.findMany({
            where: {
                // si toutes les conditions sont vraies, l'expression retourne l'objet { catSlug }. Cet objet est ensuite inclus dans l'objet where grâce à l'opérateur spread ....
                ...(catSlug && catSlug !== "null" && catSlug !== "" && { catSlug })
            },
            include: {
                cat: true
            }
        })
        return NextResponse.json(posts, {status: 200})
    } catch(error) {
        return NextResponse.json({error: "Something went wrong!"}, {status: 500})
    }

}