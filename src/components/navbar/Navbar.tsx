import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <nav>
                    <ul className={styles.navList}>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/teams">NHL Teams</Link>
                        </li>
                        <li>
                            <Link href="/schedule">Current NHL Schedule</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;