export interface NHLTeamName {
  abbrv: string;
  name: string;
}

export const NHL_TEAMS: NHLTeamName[] = [
  { abbrv: "ANA", name: "Anaheim Ducks" },
  { abbrv: "ARI", name: "Arizona Coyotes" },
  { abbrv: "BOS", name: "Boston Bruins" },
  { abbrv: "BUF", name: "Buffalo Sabres" },
  { abbrv: "CGY", name: "Calgary Flames" },
  { abbrv: "CAR", name: "Carolina Hurricanes" },
  { abbrv: "CHI", name: "Chicago Blackhawks" },
  { abbrv: "COL", name: "Colorado Avalanche" },
  { abbrv: "CBJ", name: "Columbus Blue Jackets" },
  { abbrv: "DAL", name: "Dallas Stars" },
  { abbrv: "DET", name: "Detroit Red Wings" },
  { abbrv: "EDM", name: "Edmonton Oilers" },
  { abbrv: "FLA", name: "Florida Panthers" },
  { abbrv: "LAK", name: "Los Angeles Kings" },
  { abbrv: "MIN", name: "Minnesota Wild" },
  { abbrv: "MTL", name: "Montreal Canadiens" },
  { abbrv: "NSH", name: "Nashville Predators" },
  { abbrv: "NJD", name: "New Jersey Devils" },
  { abbrv: "NYI", name: "New York Islanders" },
  { abbrv: "OTT", name: "Ottawa Senators" },
  { abbrv: "PHI", name: "Philadelphia Flyers" },
  { abbrv: "PIT", name: "Pittsburgh Penguins" },
  { abbrv: "SJS", name: "San Jose Sharks" },
  { abbrv: "SEA", name: "Seattle Kraken" },
  { abbrv: "STL", name: "St Louis Blues" },
  { abbrv: "TBL", name: "Tampa Bay Lightning" },
  { abbrv: "TOR", name: "Toronto Maple Leafs" },
  { abbrv: "VAN", name: "Vancouver Canucks" },
  { abbrv: "VGK", name: "Vegas Golden Knights" },
  { abbrv: "WSH", name: "Washington Capitals" },
  { abbrv: "WPG", name: "Winnipeg Jets" }
];

// Helper function to get team by abbreviation
export const getTeamByAbbreviation = (abbrv: string): NHLTeamName | undefined => {
  return NHL_TEAMS.find(team => team.abbrv === abbrv);
};

// Helper function to get team by name
export const getTeamByName = (name: string): NHLTeamName | undefined => {
  return NHL_TEAMS.find(team => team.name === name);
};
