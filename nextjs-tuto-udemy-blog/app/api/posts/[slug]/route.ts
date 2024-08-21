import { NextResponse } from "next/server"

export const GET = async (req: Request, { params } : { params: {slug: string}}) => {
    return NextResponse.json(params.slug, {status: 200})
}