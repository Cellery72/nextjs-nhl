'use client';
import { useState } from 'react';
import { Contestant } from '@/types/playoffBracket';
import styles from './BracketStandings.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface ContestantRowProps {
    contestant: Contestant;
}

export default function ContestantRow({ contestant }: ContestantRowProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Sort bracket entries by rank
    const sortedBracket = [...contestant.bracket].sort((a, b) => a.rank - b.rank);

    return (
        <>
            <tr 
                className={`${styles.clickableRow} ${isExpanded ? styles.expandedRow : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <td className={styles.rankCell}>{contestant.rank}</td>
                <td>{contestant.contestantName}</td>
                <td className={styles.pointsCell}>{contestant.totalPoints}</td>
            </tr>
            {isExpanded && (
                <tr className={styles.expandedContent}>
                    <td colSpan={3}>
                        <div className={styles.bracketDetails}>
                            <h3 className={styles.bracketTitle}>{contestant.contestantName}'s Bracket Picks</h3>
                            <div className={styles.bracketGrid}>
                                {sortedBracket.map((entry) => (
                                    <Link 
                                        key={entry.teamAbbrv}
                                        href={`/teams/${entry.teamAbbrv}`}
                                        className={styles.bracketEntry}
                                        onClick={(e) => e.stopPropagation()} // Prevent row expansion when clicking the link
                                    >
                                        <div className={styles.teamLogo}>
                                            <Image 
                                                src={`https://assets.nhle.com/logos/nhl/svg/${entry.teamAbbrv}_light.svg`}
                                                alt={`${entry.teamAbbrv} logo`}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <div className={styles.teamInfo}>
                                            <span className={styles.teamRank}>#{entry.rank}</span>
                                            <span className={styles.teamAbbrv}>{entry.teamAbbrv}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
} 