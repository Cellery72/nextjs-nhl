import { LanguageVariations } from "./languages";

export type Venue = {
    default: string;
    es?: string;
    fr?: string;
};

// Broadcast related types
export interface TVBroadcast {
    id: number;
    market: string;
    countryCode: string;
    network: string;
    sequenceNumber: number;
}

export interface OddsPartner {
    partnerId: number;
    country: string;
    name: string;
    imageUrl: string;
    siteUrl: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
}

export interface Odds {
    providerId: number;
    value: string;
}

export interface TeamName {
    default: string;
    fr?: string;
}

// Combined Team type (merging TeamInfo and ScheduleTeam)
export interface Team {
    id: number;
    // From TeamInfo
    commonName?: LanguageVariations;
    placeName?: LanguageVariations;
    placeNameWithPreposition?: LanguageVariations;
    darkLogo?: string;
    homeSplitSquad?: boolean;
    awaySplitSquad?: boolean;
    radioLink?: string;
    // From ScheduleTeam
    name?: TeamName;
    record?: string;
    sog?: number;
    // Common fields
    abbrev: string;
    logo: string;
    score?: number;
    odds?: Odds[];
}

// Game related types
export interface PeriodDescriptor {
    number: number;
    periodType: "REG";
    maxRegulationPeriods: number;
}

export interface DatePromo {
    default: {
        text: string;
        secondaryText: string;
        url: string;
        logoText: string;
        lightLogoUrl: string;
        darkLogoUrl: string;
    };
    country: string;
}

export interface Clock {
    timeRemaining: string;
    secondsRemaining: number;
    running: boolean;
    inIntermission: boolean;
}

export interface PlayerName {
    default: string;
    cs?: string;
    fi?: string;
    sk?: string;
    sv?: string;
}

export interface TeamLeader {
    id: number;
    firstName: PlayerName;
    lastName: PlayerName;
    headshot: string;
    teamAbbrev: string;
    sweaterNumber: number;
    position: string;
    category: string;
    value: number;
}

export interface GoalAssist {
    playerId: number;
    name: PlayerName;
    assistsToDate: number;
}

export interface Goal {
    period: number;
    periodDescriptor: PeriodDescriptor;
    timeInPeriod: string;
    playerId: number;
    name: PlayerName;
    firstName: PlayerName;
    lastName: PlayerName;
    goalModifier: string;
    assists: GoalAssist[];
    mugshot: string;
    teamAbbrev: string;
    goalsToDate: number;
    awayScore: number;
    homeScore: number;
    strength: string;
    highlightClipSharingUrl?: string;
    highlightClipSharingUrlFr?: string;
    highlightClip?: number;
    highlightClipFr?: number;
    discreteClip?: number;
    discreteClipFr?: number;
}

// Combined Game type (merging NHLGame and ScheduleGame)
export interface Game {
    id: number;
    season: number;
    gameType: number;
    venue: Venue;
    neutralSite: boolean;
    startTimeUTC: string;
    easternUTCOffset: string;
    venueUTCOffset: string;
    venueTimezone: string;
    gameState: "LIVE" | "PRE" | "FUT" | "CRIT";
    gameScheduleState: "OK";
    tvBroadcasts: TVBroadcast[];
    awayTeam: Team;
    homeTeam: Team;
    gameCenterLink: string;
    // From ScheduleGame
    gameDate?: string;
    clock?: Clock;
    period?: number;
    goals?: Goal[];
    teamLeaders?: TeamLeader[];
    // From NHLGame
    periodDescriptor?: PeriodDescriptor;
    ticketsLink?: string;
    ticketsLinkFr?: string;
}

export interface GameWeek {
    date: string;
    dayAbbrev: string;
    numberOfGames: number;
    datePromo: DatePromo[];
    games: Game[];  // Updated to use the new Game type
}

// Main schedule interface
export interface NHLSchedule {
    nextStartDate: string;
    previousStartDate: string;
    gameWeek: GameWeek[];
    oddsPartners: OddsPartner[];
    preSeasonStartDate: string;
    regularSeasonStartDate: string;
    regularSeasonEndDate: string;
    playoffEndDate: string;
    numberOfGames: number;
}

// New types for the updated schedule format
export interface GameWeekDay {
    date: string;
    dayAbbrev: string;
    numberOfGames: number;
}

// Main interface for the new schedule format
export interface ScheduleResponse {
    focusedDate: string;
    focusedDateCount: number;
    gamesByDate: GamesByDate[];
}

export interface GamesByDate {
    date: string;
    games: Game[];  // Using the combined Game type
}

// Keeping these for backward compatibility, but they're now just type aliases
export type NHLGame = Game;
export type TeamInfo = Team;
export type ScheduleGame = Game;
export type ScheduleTeam = Team;