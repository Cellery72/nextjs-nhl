import { Player, PlayerLanding } from '@/types/players';
import APIService from './apiService';
import { NHLSchedule, ScheduleResponse } from '@/types/schedule';
import { NHLStandings } from '@/types/standings';
import { Contestant } from '@/types/playoffBracket';

interface RosterResponse {
  forwards: Player[];
  defensemen: Player[];
  goalies: Player[];
}

export class NHLEService {
  private static instance: NHLEService;
  private apiService: APIService;
  private localURL: string = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; 

  
  private constructor() {
    this.apiService = new APIService('https://api-web.nhle.com');
  }

  public static getInstance(): NHLEService {
    if (!NHLEService.instance) {
      NHLEService.instance = new NHLEService();
    }
    return NHLEService.instance;
  }

  async getScheduleNow(): Promise<NHLSchedule> {
    return await this.apiService.get<NHLSchedule>('/v1/schedule/now');
  }

  async getScheduleByDate(date: string): Promise<NHLSchedule> {
    return await this.apiService.get(`/v1/schedule/${date}`);
  }

  // New method to get the schedule with the updated format
  async getScoreScheduleByDate(date: string): Promise<ScheduleResponse> {
    return await this.apiService.get<ScheduleResponse>(`/v1/scoreboard/${date}`);
  }

  async getScoreScheduleNow(): Promise<ScheduleResponse> {
    return await this.apiService.get<ScheduleResponse>('/v1/scoreboard/now');
  }

  async getTeamScheduleNow(teamCode: string) {
    return await this.apiService.get(`/v1/club-schedule/${teamCode}/week/now`);
  }

  async getTeamScheduleByWeek(teamCode: string, date: string) {
    return await this.apiService.get(`/v1/club-schedule/${teamCode}/week/${date}`);
  }

  async getTeamScheduleByMonth(teamCode: string, month: string) {
    return await this.apiService.get(`/v1/club-schedule/${teamCode}/month/${month}`);
  }

  // Standings related endpoints
  async getStandingsNow(): Promise<NHLStandings> {
    return await this.apiService.get(`/v1/standings/now`);
  }

  async getStandingsByDate(date: string) {
    return await this.apiService.get(`/v1/standings/${date}`);
  }

  // Score related endpoints
  async getScoresNow(): Promise<ScheduleResponse> {
    return await this.apiService.get<ScheduleResponse>(`/v1/score/now`);
  }

  async getScoresByDate(date: string): Promise<ScheduleResponse> {
    return await this.apiService.get<ScheduleResponse>(`/v1/score/${date}`);
  }

  async getTeamRoster(teamCode: string): Promise<Player[]> {
    const data = await this.apiService.get<RosterResponse>(`/v1/roster/${teamCode}/current`);
    return [
      ...data.forwards,
      ...data.defensemen,
      ...data.goalies
    ];
  }

  async getTeamStats(teamCode: string) {
    return await this.apiService.get(`/v1/club-stats/${teamCode}/now`);
  }

  async getTeamProspects(teamCode: string) {
    return await this.apiService.get(`/v1/prospects/${teamCode}`);
  }

  // Player related endpoints
  async getPlayerSpotlight() {
    return await this.apiService.get(`/v1/player-spotlight`);
  }

  async getPlayerLanding(playerId: number): Promise<PlayerLanding> {
    return await this.apiService.get<PlayerLanding>(`/v1/player/${playerId}/landing`);
  }

  async getPlayerGameLog(playerId: number) {
    return await this.apiService.get(`/v1/player/${playerId}/game-log/now`);
  }

  // Game related endpoints
  async getGameBoxscore(gameId: number) {
    return await this.apiService.get(`/v1/gamecenter/${gameId}/boxscore`);
  }

  async getGamePlayByPlay(gameId: number) {
    return await this.apiService.get(`/v1/gamecenter/${gameId}/play-by-play`);
  }

  async getGameLanding(gameId: number) {
    return await this.apiService.get(`/v1/gamecenter/${gameId}/landing`);
  }

  // Stats leaders endpoints
  async getCurrentSkaterStatsLeaders(categories: string, limit: number) {
    return await this.apiService.get(
      `/v1/skater-stats-leaders/current?categories=${categories}&limit=${limit}`
    );
  }

  async getCurrentGoalieStatsLeaders(categories: string, limit: number) {
    return await this.apiService.get(
      `/v1/goalie-stats-leaders/current?categories=${categories}&limit=${limit}`
    );
  }

  // Playoff related endpoints
  async getPlayoffBracket(year: string) {
    return await this.apiService.get(`/v1/playoff-bracket/${year}`);
  }

  async getPlayoffSeries(season: number, seriesLetter: string) {
    return await this.apiService.get(`/v1/schedule/playoff-series/${season}/${seriesLetter}`);
  }

  // Annual Custom Playoff Bracket
  async getContestants(season: string) {
    const year = parseInt(season);
    if (isNaN(year) || year < 2025) {
      console.log('Invalid year for contestants:', year);
      return [];
    }

    try {
      const url = `${this.localURL}/contestants-${season}.json`;
      
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Failed to fetch contestants:', response.status, response.statusText);
        return [];
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading contestants:', error);
      return [];
    }
  }

}

export const nhleService = NHLEService.getInstance();