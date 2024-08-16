import { useState } from "react";
import axios from "axios" // Pour l'envoi de requêtes a l'api
import { useRouter } from "next/router"; // Pour le routage des pages

export default function Login() {

    // Gestion de l'état pour le formulaire
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // On envoi une requête au serveur a l'aide de axios 
            const response = await axios.post("/api/login",{email,password})
            // On stock le token généré dans le local storage afin de pouvoir par la suite l'envoyer au serveur a chaque requêtes.
            localStorage.setItem("token", response.data.token)
            // Puis on redirige vers la page dashboard
            router.push("/dashboard")
        } catch (error) {
            console.error("Login failed", error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input 
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
            />
            <button type="submit" >Connexion</button>
        </form>
    );
}
