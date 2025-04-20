import { NextResponse } from "next/server";
import { NHLEService } from "@/services/nhleService";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const nhleService = NHLEService.getInstance();

        // query to get current Playoff Bracket & Contestants
        const bracket = await nhleService.getPlayoffBracket(year || new Date().getFullYear().toString());
        const contestants = await nhleService.getContestants(year || new Date().getFullYear().toString());

        return NextResponse.json({ bracket, contestants });
    }
    catch (error) {
        console.log('Error fetching Playoff Bracket data: ', error);
        return NextResponse.json({ error: 'Failed to fetch Playoff Bracket data' }, { status: 500 });
    }
}

