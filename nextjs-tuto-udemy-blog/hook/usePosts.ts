import { useQuery } from "react-query"; 
import axios from "axios"; 

export const usePosts = () => {
    return useQuery("posts", async () => {
        const { data } = await axios.get("/api/posts")
        return data
    })
}