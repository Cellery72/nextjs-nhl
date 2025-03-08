import { notFound } from 'next/navigation';
import { NHL_TEAMS } from '@/types/team-names';
import styles from './TeamPage.module.css';
import Image from 'next/image';
import TeamMembersList from './TeamMembersList';

interface TeamPageProps {
    params: {
        teamAbbr: string;
    }
}

export default async function TeamPage({ params }: TeamPageProps) {
    const team = NHL_TEAMS.find(team => team.abbrv.toUpperCase() === params.teamAbbr.toUpperCase());
    
    if (!team) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <Image 
                        src={`https://assets.nhle.com/logos/nhl/svg/${team.abbrv}_light.svg`}
                        alt={`${team.name} logo`}
                        width={200}
                        height={200}
                    />
                </div>
                <h1 className={styles.teamName}>{team.name}</h1>
                <TeamMembersList teamAbbr={team.abbrv} />
            </div>
        </div>
    );
}

// Generate static params for all teams
export function generateStaticParams() {
    return NHL_TEAMS.map((team) => ({
        teamAbbr: team.abbrv.toUpperCase(),
    }));
} 