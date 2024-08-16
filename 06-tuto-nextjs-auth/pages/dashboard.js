import { useEffect, useState, useState } from "react";
import axios from "axios" // Pour l'envoi de requêtes a l'api
import { useRouter } from "next/router"; // Pour le routage des pages
import jsw from "jsonwebtoken" // Pour l'utilisation de Json Token


export default function Register() {

    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(()=> {

        // Récupération du token dans le localStorage
        const token = localStorage.getItem("token")


        if(token){ // Si le token existe
            try{

                // Décodage du token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                setUser(decoded)

            }catch(error) {
                // On log l'erreur et on redirige vers la page login
                console.error("Invalid token", error)
                router.push("/login")
            }
        } else {
            // On redirige vers la page login
            router.push('/login')
        }
    },[])

    if(!user) return <div>Loading..</div>

    return <div>Welcome {user.email}</div>
}
