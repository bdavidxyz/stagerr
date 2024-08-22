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
import Image from "next/image"

export default function WritePage() {

    const [title, setTitle] = useState("")
    const [catSlug, setCatSlug] = useState("")
    const [content, setContent] = useState("")

    const [file, setFile] = useState<File>()
    const [imageObjectUrl, setImageObjectUrl] = useState<string | null>()

    const {data : categories, isFetching} = useCategories()

    const router = useRouter()

    const createPost = (newPost : Partial<Post>) => axios.post("/api/posts", newPost).then(res=> res.data)

    const {mutate, isLoading} = useMutation(createPost, {
        onSuccess: (data : Post) => {
            router.push(`/posts/${data.slug}`)
        }
    })

    const {data: session} = useSession()

    if (!session){
        router.replace('/login')
    }

    const onchangeFile = (e: SyntheticEvent) => {
        const files = (e.target as HTMLInputElement).files
        // Ceci est une assertion de type (type assertion) qui informe TypeScript que e.target doit être traité comme un HTMLInputElement.

        if (!files || !files[0]) return

        setFile(files[0])
        setImageObjectUrl(URL.createObjectURL(files[0]))
        // URL.createObjectURL() : Cette méthode crée une URL qui référence le fichier spécifié en mémoire. L'URL générée permet de prévisualiser le fichier, par exemple en l'affichant dans une balise <img> si c'est une image.
    }

    const handleSubmit = async (e: SyntheticEvent) => {

        e.preventDefault()

        const image = await uploadImage()

        if (title != "" && catSlug != "" && content != "" && image){
            await mutate({
                title,
                content,
                catSlug,
                slug: slugify(title),
                image: image
            })
        }

    }

    const uploadImage = async () => {
        try {
            if (!file) return

            const data = new FormData()
            data.set("file", file)
            const response = await axios.post("/api/upload", data)
            return response.data
        } catch (error) {
            console.error("Error in uploadImage", error);
            
        }
    }

    return (
        <PageContainer>
            <div className="p-10">
                <PageTitle title="Write A Post"/>

                <div className="mb-6">
                    {
                        imageObjectUrl && <div className="relative w-40 h-40 mx-auto mb-2">
                            <Image 
                                src={imageObjectUrl}
                                fill
                                alt={title}
                            />
                        </div>
                    }
                    <Input
                        type="file"
                        name="image"
                        onChange={onchangeFile}
                    />
                </div>

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

                <Button disabled={isLoading} onClick={handleSubmit} >
                    {
                        isLoading ? "Creating your article" : "Publish"
                    }
                </Button>
            </div>
        </PageContainer>
    )
}
