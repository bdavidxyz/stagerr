import styles from "@/styles/Exemple.module.css"

export default function Exemple({title, content, addNumber, number}){

    // props { title: "", content: ""}

    return(
        <div className={styles.compo} >
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => addNumber(number+1)}>Changer le nombre</button>
        </div>
    )
}