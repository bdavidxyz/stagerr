import bcrypt from "bcryptjs" // Pour le hashage du mot de passe
import { PrismaClient } from "@prisma/client" // ORM
import jsw from "jsonwebtoken" // Pour l'utilisation de Json Token

const prisma = new PrismaClient() // création d'un nouveau client prisma

    // Ici on accepte que la method POST pour la requete
    if(req.method === "POST") {

        // On récupère les informations envoyer par le front
        const { email, password } = req.body

        // Permet de récupéré une itération en bdd pour vérifié si l'user existe
        // A l'aide de la function native de prisma findUnique()
        const user = await prisma.user.findUnique({
            where: { email},
        })

        if(user && bcrypt.compareSync(password, user.password)){

            // Génération du token avec les informations user, la Secret key, et en option le temps d'expiration du token
            const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, { expiredIn: "1h"})

            res.status(200).json({token})

        } else {
            res.status(401).json({message: "Invalid email or password"})
        }

        try {

        } catch (error){ // Gestion des erreurs
            res.status(500).json({message: "User creation failed", error: error.message})
        }

    } else {
        res.status(405).json({message: "Method not allowed"})
    }


export default async function handler(req, res){
    return(
        <>
        
        </>
    )

}