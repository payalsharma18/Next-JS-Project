"use client"; 

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import Image from "next/image";
import { handleLogout } from "@/lib/actions";

// Define an array of link objects
const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Photos",
    path: "/images",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  // State to control the visibility of the mobile menu
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {/* Render NavLink components for each link in the links array */}
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {/* Conditionally render NavLink components based on user session */}
        {session?.user ? (
          <>
            {/* If the user is an admin, render the "Admin" link */}
            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}

            {/* Render a logout form */}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          // If the user is not logged in, render the "Login" link
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      {/* Render a menu button for mobile devices */}
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* Render the mobile menu links if the menu is open */}
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;