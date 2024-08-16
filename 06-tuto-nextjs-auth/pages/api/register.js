import bcrypt from "bcryptjs" // Pour le hashage du mot de passe
import { PrismaClient } from "@prisma/client" // ORM

const prisma = new PrismaClient() // création d'un nouveau client prisma

export default async function handler(req, res){

    // Ici on accepte que la method POST pour la requete
    if(req.method === "POST") {

        // On récupère les informations envoyer par le front
        const { email, password } = req.body

        // On crypte le mot de passe
        const salt = bcrypt.genSaltSync(10) // Permet de renforcer le hachage d'un mot de passe.
        const hashedPassword = bcrypt.hashSync(password, salt)

        try {

            // Création d'un nouvelle user
            const newUser = await prisma.user.create({
                data : {
                    email,
                    password: hashedPassword
                },
            })

            res.status(201).json(newUser)

        } catch (error){ // Gestion des erreurs
            res.status(500).json({message: "User creation failed", error: error.message})
        }

    } else {
        res.status(405).json({message: "Method not allowed"})
    }
}