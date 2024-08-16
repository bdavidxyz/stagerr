import jwt from "jsonwebtoken"; // Pour l'utilisation de Json Token

export default async function handler(req, res){
    // Ici on accepte que la method POST pour la requete
    if (req.method === "POST") {

        // On récupére le token envoyer par le front
        const {token} = req.body

        // On récupére la secret key
        const secret = process.env.JWT_SECRET // Par sécurité on utilise jamais une variable d'environnement dans le front

        // On vérifie que la secret key existe
        if(!secret){
            res.status(500).json({message: "JWT secret not defined"})
            return
        }

        try{
            // On decode le token a l'aide de la secret key
            const decoded = jwt.verify(token, secret)
            res.status(200).json({user: decoded})
        }catch(error){
            res.status(405).json({ message: "Invalid token" });
        }

    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
