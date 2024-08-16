import { useEffect, useState, useState } from "react";
import axios from "axios" // Pour l'envoi de requêtes a l'api
import { useRouter } from "next/router"; // Pour le routage des pages

export default function Dashboard() {

    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(()=> {

        // Récupération du token dans le localStorage
        const token = localStorage.getItem("token")

        if(token){ // Si le token existe
            axios.post("/api/verify-token", {token})
            .then(response => {
                setUser(response.data.user)
            })
            .catch(error => {
                console.error("Invalid token", error)
                router.push("/login")
            })
        } else {
            // On redirige vers la page login
            router.push('/login')
        }
    },[])

    if(!user) return <div>Loading..</div>

    return <div>Welcome {user.email}</div>
}
