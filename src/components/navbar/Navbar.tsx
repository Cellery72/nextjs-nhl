import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/teams">
                            Teams
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/players">
                            Players
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;