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
    const currentSeasonStats = player.currentSeason?.regularSeason || careerStats;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* First Row - Header */}
                <div className={styles.headerRow}>
                    <h1 className={styles.playerName}>
                        {player.firstName.default} {player.lastName.default}
                    </h1>
                    <Image 
                        src={player.teamLogo}
                        alt={`${player.teamCommonName.default} logo`}
                        width={80}
                        height={80}
                        className={styles.teamLogo}
                    />
                    <div className={styles.jerseyNumber}>
                        #{player.sweaterNumber || 'N/A'}
                    </div>
                    <div className={styles.positionCode}>
                        {player.position}
                    </div>
                </div>

                {/* Second Row - Action Image */}
                <div className={styles.actionImageRow}>
                    <Image 
                        src={player.heroImage}
                        alt={`${player.firstName.default} ${player.lastName.default} in action`}
                        width={1296}
                        height={729}
                        className={styles.actionImage}
                        priority
                    />
                </div>

                {/* Third Row - Stats */}
                <div className={styles.statsRow}>
                    {/* Headshot */}
                    <div className={styles.headshotContainer}>
                        <Image 
                            src={player.headshot}
                            alt={`${player.firstName.default} ${player.lastName.default}`}
                            width={300}
                            height={300}
                        />
                    </div>

                    {/* Career Stats */}
                    <div className={styles.careerStats}>
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
                        </div>
                    </div>

                    {/* Current Season Stats */}
                    <div className={styles.currentStats}>
                        <h2 className={styles.statsTitle}>Current Season</h2>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Games Played</div>
                                <div className={styles.statValue}>{currentSeasonStats.gamesPlayed}</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Goals</div>
                                <div className={styles.statValue}>{currentSeasonStats.goals}</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Assists</div>
                                <div className={styles.statValue}>{currentSeasonStats.assists}</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Points</div>
                                <div className={styles.statValue}>{currentSeasonStats.points}</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>+/-</div>
                                <div className={styles.statValue}>{currentSeasonStats.plusMinus}</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>PIM</div>
                                <div className={styles.statValue}>{currentSeasonStats.pim}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 