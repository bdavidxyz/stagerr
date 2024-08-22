"use client"

import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "@/hook/useCategories"
import { Category, Post } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Button } from "@/components/ui/button"
import { useMutation } from "react-query"
import axios from "axios"
import { slugify } from "@/utils/slugify"

export default function WritePage() {

    const [title, setTitle] = useState("")
    const [catSlug, setCatSlug] = useState("")
    const [content, setContent] = useState("")

    const {data : categories, isFetching} = useCategories()

    const {mutate, isLoading} = useMutation((newPost : Partial<Post>) => axios.post("/api/posts", newPost), {
        onSuccess: data => {
            
        }
    })

    const {data: session} = useSession()

    const router = useRouter()

    if (!session){
        router.replace('/login')
    }

    const handleSubmit = async (e: SyntheticEvent) => {

        e.preventDefault()

        if (title != "" && catSlug != "" && content != ""){
            await mutate({
                title,
                content,
                catSlug,
                slug: slugify(title),
                image: "img/hero.jpg"
            })
        }

    }

    return (
        <PageContainer>
            <div className="p-10">
                <PageTitle title="Write A Post"/>
                <Input 
                    type="text"
                    placeholder="Title"
                    className="mb-6" 
                    onChange={(e)=> setTitle(e.target.value)}
                    value={title}
                />
                {
                    isFetching ? <p>Loading categories</p> : <Select onValueChange={(value)=> setCatSlug(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categories.map((category : Category)=>(
                                    <SelectItem key={category.id} value={category.slug}> {category.title} </SelectItem> 
                                ))
                            }
                        </SelectContent>
                    </Select>
                }

                <ReactQuill 
                    className="my-6" 
                    placeholder="content"
                    value={content}
                    onChange={setContent}
                />

                <Button onClick={handleSubmit} >Publish</Button>
            </div>
        </PageContainer>
    )
}
