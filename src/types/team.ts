import { LanguageVariations } from "./languages";
import { Odds } from "./game";

export interface Team {
    id: number;
    commonName?: LanguageVariations;
    placeName?: LanguageVariations;
    placeNameWithPreposition?: LanguageVariations;
    darkLogo?: string;
    homeSplitSquad?: boolean;
    awaySplitSquad?: boolean;
    radioLink?: string;
    name?: TeamName;
    record?: string;
    sog?: number;
    abbrev: string;
    logo: string;
    score?: number;
    odds?: Odds[];
}

export interface TeamName {
    default: string;
    fr?: string
    abbrv: string;
}

export interface TeamLeader {
    id: number;
    firstName: LanguageVariations;
    lastName: LanguageVariations;
    headshot: string;
    teamAbbrev: string;
    sweaterNumber: number;
    position: string;
    category: string;
    value: number;
}

export const NHL_TEAMS: TeamName[] = [
    { abbrv: "ANA", default: "Anaheim Ducks" },
    { abbrv: "BOS", default: "Boston Bruins" },
    { abbrv: "BUF", default: "Buffalo Sabres" },
    { abbrv: "CGY", default: "Calgary Flames" },
    { abbrv: "CAR", default: "Carolina Hurricanes" },
    { abbrv: "CHI", default: "Chicago Blackhawks" },
    { abbrv: "COL", default: "Colorado Avalanche" },
    { abbrv: "CBJ", default: "Columbus Blue Jackets" },
    { abbrv: "DAL", default: "Dallas Stars" },
    { abbrv: "DET", default: "Detroit Red Wings" },
    { abbrv: "EDM", default: "Edmonton Oilers" },
    { abbrv: "FLA", default: "Florida Panthers" },
    { abbrv: "LAK", default: "Los Angeles Kings" },
    { abbrv: "MIN", default: "Minnesota Wild" },
    { abbrv: "MTL", default: "Montreal Canadiens" },
    { abbrv: "NSH", default: "Nashville Predators" },
    { abbrv: "NJD", default: "New Jersey Devils" },
    { abbrv: "NYI", default: "New York Islanders" },
    { abbrv: "NYR", default: "New York Rangers" },
    { abbrv: "OTT", default: "Ottawa Senators" },
    { abbrv: "PHI", default: "Philadelphia Flyers" },
    { abbrv: "PIT", default: "Pittsburgh Penguins" },
    { abbrv: "SJS", default: "San Jose Sharks" },
    { abbrv: "SEA", default: "Seattle Kraken" },
    { abbrv: "STL", default: "St Louis Blues" },
    { abbrv: "TBL", default: "Tampa Bay Lightning" },
    { abbrv: "TOR", default: "Toronto Maple Leafs" },
    { abbrv: "UTA", default: "Utah Hockey Club" },
    { abbrv: "VAN", default: "Vancouver Canucks" },
    { abbrv: "VGK", default: "Vegas Golden Knights" },
    { abbrv: "WSH", default: "Washington Capitals" },
    { abbrv: "WPG", default: "Winnipeg Jets" }
];

// Helper function to get team by abbreviation
export const getTeamByAbbreviation = (abbrv: string): TeamName | undefined => {
    return NHL_TEAMS.find(team => team.abbrv === abbrv);
};

// Helper function to get team by name
export const getTeamByName = (name: string): TeamName | undefined => {
    return NHL_TEAMS.find(team => team.default === name);
};