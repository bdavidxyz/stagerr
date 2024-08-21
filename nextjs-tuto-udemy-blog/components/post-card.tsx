import { Post } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { Eye, MessageCircle } from "lucide-react"

type Props = {
    post: Post
}

export default function PostCard({post} : Props) {
    return (
        <Link 
            href={`/posts/${post.slug}`}
        >
            <Card className="flex flex-col justify-between rounded-lg border-2 h-[100%]">
                <CardHeader>
                    <div className="aspect-square relative">
                        <Image 
                            src={"/img/hero.jpg"} 
                            fill 
                            alt={post.title} 
                            className="aspect-square objet-cover transition-all duration-300 hover:scale-110"
                        />
                    </div>
                    <p className="fpnt-semibold text-lg mt-3">
                        {post.title} 
                    </p>
                </CardHeader>
                <CardContent>
                    <Badge variant="outline">
                        {post.category}
                    </Badge>
                </CardContent>
                <CardFooter>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                            <MessageCircle 
                                size={20} className="text-slate-500"
                            />
                            <p className="text-slate-500">
                                {post.nbComments}
                            </p>
                            <Eye
                                size={20} className="text-slate-500"
                            />
                            <p className="text-slate-500">
                                {post.nbViews}
                            </p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
