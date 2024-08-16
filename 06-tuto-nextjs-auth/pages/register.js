import styles from "@/styles/Register.module.css";
import { useState } from "react";
import axios from "axios" // Pour l'envoi de requêtes a l'api
import { useRouter } from "next/router"; // Pour le routage des pages

export default function Register() {

    // Gestion de l'état pour le formulaire
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/api/register",{email,password})
            router.push("/login")
        } catch (error) {
            console.error("Registration failed", error)
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
            <button type="submit" >S'inscrire</button>
        </form>
    );
}
