import { apiService } from './apiService';
import { NHLSchedule } from '@/types/schedule';

const BASE_URL = 'https://api-web.nhle.com';

// Schedule related endpoints
export const getScheduleNow = async (): Promise<NHLSchedule> => {
  return await apiService.get<NHLSchedule>(`${BASE_URL}/v1/schedule/now`);
};

export const getScheduleByDate = async (date: string) => {
  return await apiService.get(`${BASE_URL}/v1/schedule/${date}`);
};

export const getTeamScheduleNow = async (teamCode: string) => {
  return await apiService.get(`${BASE_URL}/v1/club-schedule/${teamCode}/week/now`);
};

export const getTeamScheduleByWeek = async (teamCode: string, date: string) => {
  return await apiService.get(`${BASE_URL}/v1/club-schedule/${teamCode}/week/${date}`);
};

export const getTeamScheduleByMonth = async (teamCode: string, month: string) => {
  return await apiService.get(`${BASE_URL}/v1/club-schedule/${teamCode}/month/${month}`);
};

// Standings related endpoints
export const getStandingsNow = async () => {
  return await apiService.get(`${BASE_URL}/v1/standings/now`);
};

export const getStandingsByDate = async (date: string) => {
  return await apiService.get(`${BASE_URL}/v1/standings/${date}`);
};

// Score related endpoints
export const getScoresNow = async () => {
  return await apiService.get(`${BASE_URL}/v1/score/now`);
};

export const getScoresByDate = async (date: string) => {
  return await apiService.get(`${BASE_URL}/v1/score/${date}`);
};

// Team related endpoints
export const getTeamRoster = async (teamCode: string) => {
  return await apiService.get(`${BASE_URL}/v1/roster/${teamCode}/current`);
};

export const getTeamStats = async (teamCode: string) => {
  return await apiService.get(`${BASE_URL}/v1/club-stats/${teamCode}/now`);
};

export const getTeamProspects = async (teamCode: string) => {
  return await apiService.get(`${BASE_URL}/v1/prospects/${teamCode}`);
};

// Player related endpoints
export const getPlayerSpotlight = async () => {
  return await apiService.get(`${BASE_URL}/v1/player-spotlight`);
};

export const getPlayerLanding = async (playerId: number) => {
  return await apiService.get(`${BASE_URL}/v1/player/${playerId}/landing`);
};

export const getPlayerGameLog = async (playerId: number) => {
  return await apiService.get(`${BASE_URL}/v1/player/${playerId}/game-log/now`);
};

// Game related endpoints
export const getGameBoxscore = async (gameId: number) => {
  return await apiService.get(`${BASE_URL}/v1/gamecenter/${gameId}/boxscore`);
};

export const getGamePlayByPlay = async (gameId: number) => {
  return await apiService.get(`${BASE_URL}/v1/gamecenter/${gameId}/play-by-play`);
};

export const getGameLanding = async (gameId: number) => {
  return await apiService.get(`${BASE_URL}/v1/gamecenter/${gameId}/landing`);
};

// Stats leaders endpoints
export const getCurrentSkaterStatsLeaders = async (categories: string, limit: number) => {
  return await apiService.get(
    `${BASE_URL}/v1/skater-stats-leaders/current?categories=${categories}&limit=${limit}`
  );
};

export const getCurrentGoalieStatsLeaders = async (categories: string, limit: number) => {
  return await apiService.get(
    `${BASE_URL}/v1/goalie-stats-leaders/current?categories=${categories}&limit=${limit}`
  );
};

// Playoff related endpoints
export const getPlayoffBracket = async (year: number) => {
  return await apiService.get(`${BASE_URL}/v1/playoff-bracket/${year}`);
};

export const getPlayoffSeries = async (season: number, seriesLetter: string) => {
  return await apiService.get(`${BASE_URL}/v1/schedule/playoff-series/${season}/${seriesLetter}`);
};