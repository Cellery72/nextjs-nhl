import { NextResponse } from "next/server";
import { NHLEService } from "@/services/nhleService";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const teamAbbr = searchParams.get('teamAbbr');

        if (!teamAbbr) {
            return NextResponse.json({ error: 'Team abbreviation is required' }, { status: 400 });
        }

        const nhleService = NHLEService.getInstance();
        const rosterResponse: any = await nhleService.getTeamRoster(teamAbbr);
        
        // Combine all players into a single array
        const allPlayers = [
            ...rosterResponse.forwards,
            ...rosterResponse.defensemen,
            ...rosterResponse.goalies
        ];

        return NextResponse.json(allPlayers);
    }
    catch (error) {
        console.error('Error fetching NHL data:', error);
        return NextResponse.json({ error: 'Failed to fetch NHL Roster data' }, { status: 500 });
    }
}