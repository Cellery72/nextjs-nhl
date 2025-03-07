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

// Team related types
export interface TeamInfo {
    id: number;
    commonName: LanguageVariations;
    placeName: LanguageVariations;
    placeNameWithPreposition: LanguageVariations;
    abbrev: string;
    logo: string;
    darkLogo: string;
    homeSplitSquad?: boolean;
    awaySplitSquad?: boolean;
    radioLink: string;
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

export interface NHLGame {
    id: number;
    season: number;
    gameType: number;
    venue: Venue;
    neutralSite: boolean;
    startTimeUTC: string;
    easternUTCOffset: string;
    venueUTCOffset: string;
    venueTimezone: string;
    gameState: "LIVE" | "PRE" | "FUT";
    gameScheduleState: "OK";
    tvBroadcasts: TVBroadcast[];
    awayTeam: TeamInfo;
    homeTeam: TeamInfo;
    periodDescriptor: PeriodDescriptor;
    ticketsLink?: string;
    ticketsLinkFr?: string;
    gameCenterLink: string;
}

export interface GameWeek {
    date: string;
    dayAbbrev: string;
    numberOfGames: number;
    datePromo: DatePromo[];
    games: NHLGame[];
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