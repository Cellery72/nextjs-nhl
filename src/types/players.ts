import { LanguageVariations } from "./languages";

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

export interface Team {
    forwards: Forward[];
    defensemen: Defenseman[];
    goalies: Goalie[];
}