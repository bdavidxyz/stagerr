import styles from "@/styles/Form.module.css"
import { useState } from "react"

export default function Form(){

    const [formData, setFormData] = useState({
        nom: "",
        prenom: ""
    })
    
    const handleChange = (e) => {
        const { type, name, value } = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
    
        e.preventDefault()

        console.log(formData);
        
        setFormData({
            nom: "",
            prenom: ""
        })
    }
    
    return(
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>

                <label>Nom :</label>
                <input 
                    type="text"
                    placeholder="Entrez votre nom"
                    value={formData.nom || ""}
                    name="nom"
                    onChange={handleChange}
                />

                <label>Prénom :</label>
                <input 
                    type="text"
                    placeholder="Entrez votre prénom"
                    value={formData.prenom || ""}
                    name="prenom"
                    onChange={handleChange}
                />
                <br /><br />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}