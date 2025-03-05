import Link from "next/link";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerSection}>
                <h4>Search</h4>
                <nav>
                    <Link href="/teams">Teams</Link>
                    <Link href="/players">Players</Link>
                </nav>
            </div>
            
            <div className={styles.footerSection}>
                <h4>Connect With Us</h4>
                <div className={styles.socialLinks}>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
        </div>
        
        <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Justin Ellery. All rights reserved.</p>
        </div>
    </footer>
    )
}

export default Footer;