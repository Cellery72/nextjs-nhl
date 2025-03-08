import Link from 'next/link';
import Image from 'next/image';
import { NHL_TEAMS } from '@/types/team-names';
import styles from './TeamsList.module.css';
    
export default function TeamsList() {
    return (
        <div className={styles.grid}>
            {NHL_TEAMS.map((team) => (
                <Link 
                    key={team.abbrv} 
                    href={`/teams/${team.abbrv.toUpperCase()}`}
                    className={styles.teamCard}>
                    <div className={styles.imageContainer}>
                        <Image 
                            src={`https://assets.nhle.com/logos/nhl/svg/${team.abbrv}_light.svg`} 
                            alt={team.name}     
                            width={100} 
                            height={100} 
                        />
                    </div>
                    <h2 className={styles.teamName}>{team.name}</h2>
                </Link>
            ))}
        </div>
    );
}
