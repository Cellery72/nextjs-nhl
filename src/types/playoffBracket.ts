import { Team } from './team';
import { LanguageVariations } from './languages';

export interface PlayoffSeries {
    seriesUrl?: string;
    seriesTitle: string;
    seriesAbbrev: string;
    seriesLetter: string;
    playoffRound: number;
    topSeedRank: number;
    topSeedRankAbbrev?: string;
    topSeedWins: number;
    bottomSeedRank: number;
    bottomSeedRankAbbrev?: string;
    bottomSeedWins: number;
    topSeedTeam?: Team;
    bottomSeedTeam?: Team;
    seriesLogo?: string;
    seriesLogoFr?: string;
}

export interface NHLPlayoffBracket {
    bracketLogo: string;
    bracketLogoFr: string;
    series: PlayoffSeries[];
}

export interface BracketEntry {
    rank: number;
    teamAbbrv: string;
}

export interface Contestant {
    contestantName: string;
    bracket: BracketEntry[];
    rank: string | null;
    totalPoints: number | null;
}


export function calculateTeamWins(bracket: NHLPlayoffBracket): Record<string, number> {
    const teamWins: Record<string, number> = {};

    bracket.series.forEach(series => {
        if (series.topSeedTeam && series.topSeedWins > 0) {
            const teamAbbrev = series.topSeedTeam.abbrev;
            teamWins[teamAbbrev] = (teamWins[teamAbbrev] || 0) + series.topSeedWins;
        }

        if (series.bottomSeedTeam && series.bottomSeedWins > 0) {
            const teamAbbrev = series.bottomSeedTeam.abbrev;
            teamWins[teamAbbrev] = (teamWins[teamAbbrev] || 0) + series.bottomSeedWins;
        }
    });

    return teamWins;
}

export function calculateContestantPointsAndRank(contestants: Contestant[], teamWins: Record<string, number>): Contestant[] {
    // First calculate points for all contestants
    const contestantsWithPoints = contestants.map(contestant => {
        let totalPoints = 0;
        
        // For each team that has wins
        Object.entries(teamWins).forEach(([teamAbbrv, wins]) => {
            // Find the contestant's bracket entry for this team
            const bracketEntry = contestant.bracket.find((entry: BracketEntry) => entry.teamAbbrv === teamAbbrv);
            if (bracketEntry) {
                // Add points: rank * wins
                totalPoints += bracketEntry.rank * wins;
            }
        });

        // Return a new contestant object with updated totalPoints
        return {
            ...contestant,
            totalPoints
        };
    });

    // Sort contestants by points in descending order
    const sortedContestants = [...contestantsWithPoints].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));

    // Calculate ranks
    const rankedContestants = sortedContestants.map((contestant, index) => {
        // Find how many contestants have the same points
        const samePointsCount = sortedContestants.filter(c => c.totalPoints === contestant.totalPoints).length;
        
        let rank: string;
        if (samePointsCount > 1) {
            // If there are ties, find the first occurrence of this point total
            const firstIndex = sortedContestants.findIndex(c => c.totalPoints === contestant.totalPoints);
            const ordinal = getOrdinal(firstIndex + 1);
            rank = `T - ${ordinal}`;
        } else {
            // No ties, just use the position
            rank = getOrdinal(index + 1);
        }

        return {
            ...contestant,
            rank
        };
    });

    return rankedContestants;
}

// Helper function to get ordinal numbers (1st, 2nd, 3rd, etc.)
function getOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
} 