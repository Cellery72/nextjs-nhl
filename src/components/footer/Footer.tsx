import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub, FaYCombinator } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLinks}>
                    <nav>
                        <Link href="/teams">NHL Teams</Link>
                        <Link href="/schedule">Current NHL Schedule</Link>
                    </nav>
                </div>
                
                <div className={styles.socialLinks}>
                    <h4>Find me on the web</h4>
                    <div>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/cellery72" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://news.ycombinator.com/user?id=ng-user" target="_blank" rel="noopener noreferrer">
                            <FaYCombinator />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className={styles.footerBottom}>
                <p>Made for fun by <a href="https://justinellery.dev/" target="_blank" rel="noopener noreferrer">Justin Ellery</a>. All rights reserved.</p>
                <p> Copyright 2025 &copy;</p>
                <p>Data provided by <a href="https://api-web.nhle.com" target="_blank" rel="noopener noreferrer">NHL.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;