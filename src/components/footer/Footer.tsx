import Link from "next/link";
import styles from "./Footer.module.css";
import { FaLinkedin, FaGithub, FaYCombinator } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLinks}>
                    <nav>
                        <Link href="/">Home</Link>
                    </nav>
                </div>
                
                <div className={styles.socialLinks}>
                    <h4>Find me on the web</h4>
                    <div>
                        <a href="https://x.com/Ellery_Justin" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                        <a href="https://www.linkedin.com/in/jellery/" target="_blank" rel="noopener noreferrer">
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
                <p>Made for fun by <a href="https://justinellery.dev/" target="_blank" rel="noopener noreferrer">Justin Ellery</a>.</p>
                <p> Copyright 2025 &copy; All rights reserved.</p>
                <p>Data provided by <a href="https://api-web.nhle.com" target="_blank" rel="noopener noreferrer">NHL.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;