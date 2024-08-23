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

export default function Comments({postSlug} : {postSlug:string}) {

    const {status} = useSession()

    const [content, setContent] = useState("")

    const createComment = (newComment: Partial<Comment>) => {
        return axios.post('/api/comments', newComment).then(res => res.data)
    }

    const {mutate, isLoading} = useMutation(createComment, {
        onSuccess: (data: Comment) => {

        }
    })

    const onSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault()

        mutate({content, postSlug})

    }

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
            </div>

        </div>
    )
}
