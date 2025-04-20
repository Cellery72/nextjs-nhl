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

                    <span className={styles.separator}>|</span>

                    <Image 
                        src={player.teamLogo}
                        alt={`${player.teamCommonName.default} logo`}
                        width={80}
                        height={80}
                        className={styles.teamLogo}
                    />

                    <span className={styles.separator}>|</span>

                    <div className={styles.jerseyNumber}>
                        #{player.sweaterNumber || 'N/A'}
                    </div>

                    <span className={styles.separator}>|</span>

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

                    <div className={styles.playerDetails}>
                        <div className={styles.playerDetailsRow}>
                            <div className={styles.playerDetailsValue}><span className={styles.playerDetailsLabel}>Height: </span>{formatHeight(player.heightInInches)}</div>
                            <div className={styles.playerDetailsValue}><span className={styles.playerDetailsLabel}>Weight: </span>{player.weightInPounds} lbs</div>
                            <div className={styles.playerDetailsValue}><span className={styles.playerDetailsLabel}>Born: </span>{player.birthCountry}</div>
                            <div className={styles.playerDetailsValue}><span className={styles.playerDetailsLabel}>Birthplace: </span>{formatHeight(player.heightInInches)}</div>
                            <div className={styles.playerDetailsValue}><span className={styles.playerDetailsLabel}>Catches: </span>{player.shootsCatches}</div>
                            <div className={styles.playerDetailsValue}><span className={styles.playerDetailsLabel}>Draft: </span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 