import { Team } from '@/types';
import { apiService } from './apiService';

export class TeamService {
    private static instance: TeamService;
    private teams: Map<string, Team> = new Map();

    private constructor() {}

    public static getInstance(): TeamService {
        if (!TeamService.instance) {
            TeamService.instance = new TeamService();
        }
        return TeamService.instance;
    }

    async getAllTeams(): Promise<Team[]> {
        try {
            const teams = await apiService.get<Team[]>('/teams');
            return teams;
        } catch (error) {
            console.error('Error fetching teams:', error);
            return [];
        }
    }

    async getTeam(abbrv: string): Promise<Team | undefined> {
        try {
            const teams = await this.getAllTeams();
            return teams.find(t => t.abbreviation === abbrv);
        } catch (error) {
            console.error('Error fetching team:', error);
            return undefined;
        }
    }

    async saveTeams(teams: Team[]): Promise<boolean> {
        try {
            await apiService.post('/teams/batch', teams);
            return true;
        } catch (error) {
            console.error('Error saving teams:', error);
            return false;
        }
    }
}

export const teamService = TeamService.getInstance();