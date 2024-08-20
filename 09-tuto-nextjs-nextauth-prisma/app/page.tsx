import { LoginButton, LogoutButton } from "@/components/AuthButtons";
import { auth } from "@/lib/auth";

export default async function Home() {

  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        {
          session?.user ? "Authentificated " + session?.user.email : "Not Authentificated"
        }
      </h1>
      <div>
        {
          !session?.user ? <LoginButton /> : <LogoutButton />
        }
      </div>
    </main>
  );
}
