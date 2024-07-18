"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { usePathname } from "next/navigation";

const Navbar = () => {
  // const path = usePathname();
  // console.log("Path::", path);
  return (
    <nav className={styles.container}>
      <ul className={styles.navbar}>
        <li>
          <Link className={styles.links} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={styles.links} href="/clientSideCharacter/1">
            Client Side Characters
          </Link>
        </li>
        <li>
          <Link className={styles.links} href="/serverSideCharacters/1">
            Server Side Characters
          </Link>
        </li>
        <li>
          <Link className={styles.links} href="/episodes?epi=S01">
            Episodes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
