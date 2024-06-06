import Link from "next/link"
import Links from "./links/Links"
import styles from "./navbar.module.css"
import { auth } from "@/lib/auth";

const Navbar = async () => {

  const session = await auth(); // Get the current session information using the auth function

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Creative Minds</Link>
      <div>
        <Links session={session}/>   {/* Render the Links component and pass the session information as a prop */}
      </div>
    </div>
  )
}

export default Navbar