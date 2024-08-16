import axios from "axios"
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState([])

  // Utilisation de useEffect afin de récupéré les informations en BDD
  useEffect(()=>{

    // Utilisation de Axios pour les requêtes
    axios.post("/api/posts")
    .then(response => {
      setPosts(response.data.posts)
    })
    .catch(error => {
      console.error("Error", error)
    })
  },[])
  
  return (
    <>
      { // On fait un map pour afficher le résultat
        posts.map((item, index)=> <div key={index}><h3>{item.title}</h3><p>{item.content}</p></div>)
      }
    </>
  );
}
