import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

export default function CategiriesPage({params} : Props) {

    const {slug} = params

    return (
        <div>CategoriesPage {slug}</div>
    )
}
