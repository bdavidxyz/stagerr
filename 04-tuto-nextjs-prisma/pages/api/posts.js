import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

    // On récupère tout les posts en BDD
    // const posts = await prisma.post.findMany()

    const posts = await prisma.post.findMany({
        where: {
            AND: [
                {
                    content: {
                        contains: "est"
                    }
                },
                {
                    OR: [
                        {
                            title: {
                                contains: "?"
                            }
                        },
                        {
                            title: {
                                contains: "!"
                            }
                        },    
                    ]
                }
            ]
        },
        orderBy: {
            id: "desc"
        }
    })

    res.json(posts)
}
