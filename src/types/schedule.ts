import { Game, OddsPartner } from "./game";

export interface GameWeek {
    date: string;
    dayAbbrev: string;
    numberOfGames: number;
    datePromo: DatePromo[];
    games: Game[];  // Updated to use the new Game type
}

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

export interface ScheduleResponse {
    focusedDate: string;
    focusedDateCount: number;
    gamesByDate: GamesByDate[];
}

export interface GamesByDate {
    date: string;
    games: Game[];  // Using the combined Game type
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
