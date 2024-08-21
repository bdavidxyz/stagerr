import Link from "next/link";
import { Button } from "./ui/button";

export default function ProfileButton() {
    // L'utilisateur est pas connecté => bouton login

    return (
        <Link href="/login">
            <Button>Login</Button>
        </Link>
    )

    // L'utilisateur est connecté => avatar + menu

}
