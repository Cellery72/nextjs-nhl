import { NextResponse } from "next/server";
import { NHLEService } from "@/services/nhleService";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const nhleService = NHLEService.getInstance();

        console.log('Fetching bracket data for year:', year);
        
        // query to get current Playoff Bracket & Contestants
        const bracket = await nhleService.getPlayoffBracket(year || new Date().getFullYear().toString());
        console.log('Bracket data fetched successfully');
        
        const contestants = await nhleService.getContestants(year || new Date().getFullYear().toString());
        console.log('Contestants data fetched successfully');

        return NextResponse.json({ bracket, contestants });
    }
    catch (error) {
        console.error('Error fetching Playoff Bracket data:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch Playoff Bracket data',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

