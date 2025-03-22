import { LanguageVariations } from "./languages";
import { Team, TeamLeader } from "./team";

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
    gameState: "LIVE" | "PRE" | "FUT" | "CRIT" | "OFF";
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

// Game related Types
export type Venue = {
    default: string;
    es?: string;
    fr?: string;
};

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

export interface PeriodDescriptor {
    number: number;
    periodType: "REG";
    maxRegulationPeriods: number;
}

export interface Clock {
    timeRemaining: string;
    secondsRemaining: number;
    running: boolean;
    inIntermission: boolean;
}

export interface GoalAssist {
    playerId: number;
    name: LanguageVariations;
    assistsToDate: number;
}

export interface Goal {
    period: number;
    periodDescriptor: PeriodDescriptor;
    timeInPeriod: string;
    playerId: number;
    name: LanguageVariations;
    firstName: LanguageVariations;
    lastName: LanguageVariations;
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