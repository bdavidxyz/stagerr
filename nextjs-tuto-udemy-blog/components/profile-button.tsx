"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function ProfileButton() {

    const {data: session, status} = useSession()

    // L'utilisateur est pas connecté => bouton login
    // status == "unauthenticated" <---- Equivalent a !session
    if (!session){
        return (
            <Link href="/login">
                <Button>Login/Signup</Button>
            </Link>
        )
    }

    const onLogout = () => {
        signOut()
    }

    // L'utilisateur est connecté => avatar + menu
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={session.user?.image || "/img/shadcn.jpeg"} />
                    <AvatarFallback>{session.user?.name}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem 
                    onClick={() => onLogout()}
                    className="cursor-pointer"
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}
