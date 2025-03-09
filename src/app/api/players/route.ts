import { NextResponse } from "next/server";
import { NHLEService } from "@/services/nhleService";
import { Player } from "@/types/players";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const teamAbbr = searchParams.get('teamAbbr');

        if (!teamAbbr) {
            return NextResponse.json({ error: 'Team abbreviation is required' }, { status: 400 });
        }

        const nhleService = NHLEService.getInstance();
        const allPlayers: Player[] = await nhleService.getTeamRoster(teamAbbr);
        return NextResponse.json(allPlayers);
    }
    catch (error) {
        console.error('Error fetching NHL data:', error);
        return NextResponse.json({ error: 'Failed to fetch NHL Roster data' }, { status: 500 });
    }
}