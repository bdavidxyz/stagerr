"use client"

import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useMutation } from 'react-query'
import axios from 'axios'
import { Comment } from '@prisma/client'
import { useComments } from '@/hook/useComments'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { CommentWithUser } from '@/types'

export default function Comments({postSlug} : {postSlug:string}) {

    const {status} = useSession()
    const [content, setContent] = useState("")

    // Mutation - Création d'un commentaire
    const createComment = (newComment: Partial<Comment>) => {
        return axios.post('/api/comments', newComment).then(res => res.data)
    }

    const {mutate, isLoading} = useMutation(createComment, {
        onSuccess: (data: Comment) => {
            console.log("Comment has been created", data);
            
        }
    })

    const onSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault()
        mutate({content, postSlug})
    }

    // Get all - comments
    const {data: comments, isFetching} = useComments(postSlug)

    return (
        <div className='mt-10'>
            <Separator />
            <h2 className='text-2xl text-slate-500 font-semibold mt-4'>Comments</h2>
            
            <div className='mt-2 mb-6'>
                {
                    status == "authenticated" ? <div className=''>
                        <Textarea 
                            placeholder='Any comment ?'
                            onChange={e => setContent(e.target.value)}
                            value={content}
                        />
                        <Button 
                            disabled={content == "" || isLoading}
                            onClick={onSubmit}
                            className='mt-4'
                        >
                            { isLoading ? "Adding your comment" : "Add your comment"}
                        </Button>
                    </div> :
                    <Link href="/login" className='underline'>
                        Login to write a comment
                    </Link>
                }

                {/* List comments */}
                {
                    !isFetching && comments.map((comment: CommentWithUser) => (
                        <div className='flex items-center mt-3' key={comment.id}>
                            <Avatar>
                                <AvatarImage src={comment.user.image || "/img/shadcn.jpeg"} />
                                <AvatarFallback>
                                    {comment.user.name}
                                </AvatarFallback>
                            </Avatar>   
                            <div className='ml-3 p-4 border rounded-lg border-slate-400'>
                                <div className='flex items-center gap-2'>
                                    <span>{comment.user.name}</span>    
                                    <span className='text-slate-500 text-sm'>{new Date(comment.createdAt).toLocaleDateString()}</span> 
                                </div>
                                <p>{comment.content}</p>
                            </div> 
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
