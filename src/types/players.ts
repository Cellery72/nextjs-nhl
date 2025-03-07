import { LanguageVariations } from "./languages";

// Base player properties that all player types share
export interface BasePlayer {
    id: number;
    headshot: string;
    firstName: LanguageVariations;
    lastName: LanguageVariations;
    sweaterNumber?: number; // Optional as some players might not have a number assigned
    shootsCatches: "L" | "R";
    heightInInches: number;
    weightInPounds: number;
    heightInCentimeters: number;
    weightInKilograms: number;
    birthDate: string;
    birthCity: LanguageVariations;
    birthCountry: string;
    birthStateProvince?: LanguageVariations; // Optional as not all countries have states/provinces
}

// Forward-specific properties
export interface Forward extends BasePlayer {
    positionCode: "C" | "L" | "R";
}

// Defenseman-specific properties
export interface Defenseman extends BasePlayer {
    positionCode: "D";
}

// Goalie-specific properties
export interface Goalie extends BasePlayer {
    positionCode: "G";
}

// Union type for any type of player
export type Player = Forward | Defenseman | Goalie;

// Team structure
export interface Team {
    forwards: Forward[];
    defensemen: Defenseman[];
    goalies: Goalie[];
}