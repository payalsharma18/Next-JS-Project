import { handleGithubLogin } from "@/lib/actions"
const LogIn = async () => {
 
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>LogIn with Github</button>

      </form>
    </div>
  )
}

export default LogIn