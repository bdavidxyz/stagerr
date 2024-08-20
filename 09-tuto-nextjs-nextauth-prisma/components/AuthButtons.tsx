"use client"

import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {
    return(
        <button 
            onClick={()=> signIn()}
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
            Login
        </button>
    )
}

export const LogoutButton = () => {
    return(
        <button 
            onClick={()=> signOut()}
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"           
        >
            Logout
        </button>
    )
}