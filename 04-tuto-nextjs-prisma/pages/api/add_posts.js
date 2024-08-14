import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const updateUser = await prisma.user.update({
        where: {
            id: 1
        },
        data: {
            name: "Tommy"
        }
    })
    res.status(200).send("Ok !")
}
