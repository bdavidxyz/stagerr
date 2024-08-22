import { useQuery } from "react-query"; 
import axios from "axios"; 

export const useCategories = () => {
    return useQuery("categories", async () => {
        const { data } = await axios.get("/api/categories")
        return data
    })
}