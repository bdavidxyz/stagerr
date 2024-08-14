import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "@/components/Header"
import { useState, useEffect } from "react"

export default function Home(){

  const [task, setTask] = useState("")
  const [tab, setTab] = useState([])

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const addValue = () => {
    setTab(prev => {
      return [...prev, {
        id: prev.length+1,
        task: task
      }]
    })

    setTask("")
  }

  const deleteTask = (id) => {
    const newTab = tab.filter((item)=> item.id != id)
    setTab(newTab)
  }

  console.log(tab);
  

  return(
    <>
      <Head>
        <title>Accueil</title>
      </Head>
      <Header />
      <h1><span className={`${styles.icon} material-symbols-outlined`}>home</span>Todolist</h1>
      <div className={styles.todolist}>
        <label htmlFor="task">Ajouter une tâche</label>
        <input type="text" value={task} onChange={handleChange} placeholder="Entrez une tâche.." id="task"/>
        {
          task && (<button onClick={addValue}>Ajouter</button>)
        }
        <h3>Liste des tâches</h3>
        <ul>
          {
            tab.map((item)=>{
              return <li key={item.id}>{item.task} <button onClick={()=> deleteTask(item.id)}>X</button></li>
            })
          }
        </ul>
      </div>
    </>
  )
}