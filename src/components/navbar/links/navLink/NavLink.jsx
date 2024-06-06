"use client"; 
import Link from "next/link"; 
import styles from "./navLink.module.css"; 
import { usePathname } from "next/navigation"; 

const NavLink = ({ item }) => {
  // Get the current path using the usePathname hook
  const pathName = usePathname();

  return (
    // Render a Link component with dynamic styles based on the current path
    <Link
      href={item.path} // Set the href of the Link to the path of the item
      className={`${styles.container} ${
        pathName === item.path && styles.active // Add an active class if the current path matches the item's path
      }`}
    >
      {item.title} {/* Display the title of the item */}
    </Link>
  );
};

export default NavLink;