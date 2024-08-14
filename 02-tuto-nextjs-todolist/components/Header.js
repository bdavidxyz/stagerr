import Link from "next/link"
import styles from "@/styles/Header.module.css"

export default function Header(){
    return (
        <>
            <ul className={styles.menu}>
                <li><Link href="/" >Accueil</Link></li>
                <li><Link href="/about" >About</Link></li>
                <li><Link href="/blog" >Blog</Link></li>
            </ul>
        </>
    )
}