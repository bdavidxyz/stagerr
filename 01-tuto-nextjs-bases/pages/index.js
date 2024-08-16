import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "@/components/Header"
import Exemple from "@/components/Exemple"
import Form from "@/components/Form"

import { useState, useEffect } from "react"

export default function Home(){

  // ############ HOOK

  // const [firstname, setFirstname] = useState("Renaud")

  // const updateValue = (firstname) => {
  //   setFirstname(firstname)
  // }

  // const [tab, setTab] = useState([1, 2, 3])

  // const addValue = () => {
  //   setTab(prev=> { // prev correspond a tab
  //     return [...prev, 4] // Utilisation du spread operator pour ajouter une données
  //   })
  // }

  // useEffect(()=>{
  //   console.log("Modification !");
  // }, [tab])

  // const [tab, setTab] = useState({
  //   nom: "Renaud",
  //   age: 35
  // })

  // const addValue = () => {
  //   setTab(prev=> { // prev correspond a tab
  //     return {
  //       ...prev,
  //       genre: "Homme"
  //     } // Utilisation du spread operator pour ajouter une données
  //   })
  // }

  // console.log(tab);

  // const [datas, setDatas] = useState(null) // Un état pour les datas
  // const [loading, setLoading] = useState(false) // Un état pour le chargement 

  // Cet méthode ne fonctionnera pas et crééra une boucle infini, il faut utilisé useEffect pour cela.
  // const fetchArticles = async () => {
  //   const res = await fetch("https://dog.ceo/api/breeds/image/random")
  //   const data = await res.json()
  //   setDatas(data)
  // }

  // fetchArticles()

  // useEffect(() => {

  //   const fetchArticles = async () => {
  //     const res = await fetch("https://dog.ceo/api/breeds/image/random")
  //     const data = await res.json()
  //     setDatas(data)
  //     setLoading(true)
  //   }

  //   fetchArticles()
  // },[])

  // console.log(datas);
  
  // ############ MAP

  // const [firstname, setFirstname] = useState("Renaud")
  // // const [age, setAge] = useState("")
  // const [val, setVal] = useState(null)

  // const [tab, setTab] = useState([
  //   {
  //     nom: "Renaud",
  //     age: 34
  //   },
  //   {
  //     nom: "Tommy",
  //     age: 1
  //   },    {
  //     nom: "Edith",
  //     age: 32
  //   },
  // ])  

  // useEffect(()=>{
  //   const valeurs = tab.map((person, index)=>{
  //     return <li key={index}>{person.nom} à {person.age} ans.</li>
  //   })
  //   setVal(valeurs)
  // },[])

  // ############ PROPS

  // const [articles, setArticles] = useState([
  //   {
  //     title: "Composant 1",
  //     content: "Composant content 1"
  //   },
  //   {
  //     title: "Composant 2",
  //     content: "Composant content 2"
  //   },
  //   {
  //     title: "Composant 3",
  //     content: "Composant content 3"
  //   },
  // ])

  // const [number, setNumber] = useState(1)

  // const addNumber = (x) => {
  //   setNumber(x)
  // }

  // ############ FORMULAIRE



  return(
    <>
      <Head>
        <title>Accueil</title>
      </Head>
      <Header />
      <h1><span className={`${styles.icon} material-symbols-outlined`}>home</span>Accueil</h1>
      {/* ###### HOOK
      { <br />
        loading ? (datas.message) : ( <h3>Chargement...</h3>)
      } */}
      {/* <button onClick={() => updateValue("Tommy")}>Modifier le prénom</button> */}
      {/* <button onClick={addValue}>Ajouter une valeur</button> */}
      
      {/* ###### MAP */}

      {/* <br />
      <button onClick={()=> setAge(34)}>Ajouter l'âge</button>
      {firstname && age ? (
        <p>{firstname} est âgé de {age} ans.</p>
      ) : (
        <p>Pas de données spécifiques..</p>
      )} */}
{/* 
      <br />
      <ul>
        {
          val
        }
      </ul> */}

      {/* ###### PROPS */}

      {/* <h1>Number : {number}</h1>
      {
        articles.map((post,index)=>{
          return <Exemple key={index} number={index} addNumber={addNumber} title={post.title} content={post.content} />
        })
      } */}

      {/* ###### FORMULAIRE */}

      <Form />
    </>
  )
}