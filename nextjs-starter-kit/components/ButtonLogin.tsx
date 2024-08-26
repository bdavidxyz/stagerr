"use client"
import { signIn, signOut, useSession  } from "next-auth/react"

export default function ButtonLogin() {

    const { status } = useSession() 

    if ( status == "unauthenticated")
    return (
        <button type="button" onClick={() => signIn()} className={` text-white dark:text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 dark:bg-white dark:hover:bg-gray-600 dark:focus:ring-gray-500`}>
            Login/Signup
        </button>
    )

    return (
        <button type="button" onClick={() => signOut()} className={` text-white dark:text-black bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 dark:bg-white dark:hover:bg-gray-600 dark:focus:ring-gray-500`}>
            Logout
        </button>
    )

}