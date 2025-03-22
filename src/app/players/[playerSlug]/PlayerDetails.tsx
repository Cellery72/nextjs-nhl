'use client';

import Image from 'next/image';
import styles from './PlayersPage.module.css';
import { PlayerLanding } from '@/types/players';

function formatHeight(inches: number): string {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
}

function formatWeight(pounds: number): string {
    return `${pounds} lbs`;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

interface PlayerDetailsProps {
    player: PlayerLanding;
}

export default function PlayerDetails({ player }: PlayerDetailsProps) {
    const careerStats = player.careerTotals.regularSeason;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.playerInfo}>
                    <div className={styles.headshotContainer}>
                        <Image 
                            src={player.headshot}
                            alt={`${player.firstName.default} ${player.lastName.default}`}
                            width={300}
                            height={300}
                            priority
                        />
                    </div>
                    <h1 className={styles.playerName}>
                        {player.firstName.default} {player.lastName.default}
                    </h1>
                </div>

                <div className={styles.playerDetails}>
                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>Position</div>
                        <div className={styles.detailValue}>{player.position}</div>
                    </div>
                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>Number</div>
                        <div className={styles.detailValue}>{player.sweaterNumber || 'N/A'}</div>
                    </div>
                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>Height</div>
                        <div className={styles.detailValue}>{formatHeight(player.heightInInches)}</div>
                    </div>
                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>Weight</div>
                        <div className={styles.detailValue}>{formatWeight(player.weightInPounds)}</div>
                    </div>
                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>Born</div>
                        <div className={styles.detailValue}>{formatDate(player.birthDate)}</div>
                    </div>
                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>Birthplace</div>
                        <div className={styles.detailValue}>
                            {player.birthCity.default}
                            {player.birthStateProvince ? `, ${player.birthStateProvince.default}` : ''}
                        </div>
                    </div>
                </div>

                <div className={styles.statsSection}>
                    <h2 className={styles.statsTitle}>Career Statistics</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Games Played</div>
                            <div className={styles.statValue}>{careerStats.gamesPlayed}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Goals</div>
                            <div className={styles.statValue}>{careerStats.goals}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Assists</div>
                            <div className={styles.statValue}>{careerStats.assists}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Points</div>
                            <div className={styles.statValue}>{careerStats.points}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>+/-</div>
                            <div className={styles.statValue}>{careerStats.plusMinus}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>PIM</div>
                            <div className={styles.statValue}>{careerStats.pim}</div>
                        </div>
                        {careerStats.avgToi && (
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Avg TOI</div>
                                <div className={styles.statValue}>{careerStats.avgToi}</div>
                            </div>
                        )}
                        {careerStats.faceoffWinningPctg && (
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>FO%</div>
                                <div className={styles.statValue}>{careerStats.faceoffWinningPctg.toFixed(1)}%</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 