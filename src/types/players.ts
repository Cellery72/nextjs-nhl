import { LanguageVariations } from "./languages";

// Utility function to generate a URL-friendly publicId from player name and ID
export function generatePlayerPublicId(firstName: LanguageVariations, lastName: LanguageVariations, id: number): string {
    const fullName = `${firstName.default} ${lastName.default}`.toLowerCase();
    // Replace spaces with dashes and remove any special characters
    const nameSlug = fullName.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `${nameSlug}-${id}`;
}

export class BasePlayer {
    id!: number;
    headshot!: string;
    firstName!: LanguageVariations;
    lastName!: LanguageVariations;
    sweaterNumber?: number;
    shootsCatches!: "L" | "R";
    heightInInches!: number;
    weightInPounds!: number;
    heightInCentimeters!: number;
    weightInKilograms!: number;
    birthDate!: string;
    birthCity!: LanguageVariations;
    birthCountry!: string;
    birthStateProvince?: LanguageVariations;

    constructor(playerData: Omit<BasePlayer, "playerSlug">) {
        Object.assign(this, playerData);
    }
    
    get playerSlug(): string {
        const firstName = this.firstName.default.replace(" ", "-");
        const lastName = this.lastName.default.replace(" ", "-");
        return `${firstName}-${lastName}-${this.id}`.toLowerCase();
    }
}

export interface Forward extends BasePlayer {
    positionCode: "C" | "L" | "R";
}

export interface Defenseman extends BasePlayer {
    positionCode: "D";
}

export interface Goalie extends BasePlayer {
    positionCode: "G";
}

export type Player = Forward | Defenseman | Goalie;


export interface PlayerRoster {
    forwards: Forward[];
    defensemen: Defenseman[];
    goalies: Goalie[];
}

export interface PlayerStats {
    assists: number;
    gameWinningGoals: number;
    gamesPlayed: number;
    goals: number;
    otGoals: number;
    pim: number;
    plusMinus: number;
    points: number;
    powerPlayGoals: number;
    powerPlayPoints: number;
    shootingPctg: number;
    shorthandedGoals: number;
    shorthandedPoints: number;
    shots: number;
    avgToi?: string;
    faceoffWinningPctg?: number;
    blockedShots?: number;
    hits?: number;
}

export interface PlayerSeasonTotal {
    assists: number;
    gameTypeId: number;
    gamesPlayed: number;
    goals: number;
    leagueAbbrev: string;
    pim: number;
    points: number;
    season: number;
    sequence: number;
    teamName: LanguageVariations;
    teamCommonName?: LanguageVariations;
    teamPlaceNameWithPreposition?: LanguageVariations;
    gameWinningGoals?: number;
    plusMinus?: number;
    powerPlayGoals?: number;
    powerPlayPoints?: number;
    shootingPctg?: number;
    shorthandedGoals?: number;
    shots?: number;
    avgToi?: string;
    faceoffWinningPctg?: number;
}

export interface PlayerAward {
    trophy: LanguageVariations;
    seasons: {
        assists: number;
        blockedShots: number;
        gameTypeId: number;
        gamesPlayed: number;
        goals: number;
        hits: number;
        pim: number;
        plusMinus: number;
        points: number;
        seasonId: number;
    }[];
}

export interface PlayerBadge {
    logoUrl: LanguageVariations;
    title: LanguageVariations;
}

export interface PlayerLanding extends BasePlayer {
    isActive: boolean;
    currentTeamId: number;
    currentTeamAbbrev: string;
    fullTeamName: LanguageVariations;
    teamCommonName: LanguageVariations;
    teamPlaceNameWithPreposition: LanguageVariations;
    badges: PlayerBadge[];
    teamLogo: string;
    position: string;
    heroImage: string;
    draftDetails?: {
        year: number;
        teamAbbrev: string;
        round: number;
        pickInRound: number;
        overallPick: number;
    };
    playerSlug: string;
    inTop100AllTime: number;
    inHHOF: number;
    featuredStats: {
        season: number;
        regularSeason: {
            subSeason: PlayerStats;
            career: PlayerStats;
        };
    };
    careerTotals: {
        regularSeason: PlayerStats;
        playoffs: PlayerStats;
    };
    seasonTotals: PlayerSeasonTotal[];
    awards: PlayerAward[];
    currentTeamRoster: {
        playerId: number;
        lastName: LanguageVariations;
        firstName: LanguageVariations;
        playerSlug: string;
    }[];
}