import { signIn } from "@/lib/auth"

const LogIn = async () => {
  const handleGithubLogin = async () => {
    "use server"
    await signIn("github")
  }
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>LogIn with Github</button>

      </form>
    </div>
  )
}

export default LogIn