import { NextResponse } from 'next/server';
import { NHLEService } from '@/services/nhleService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    const nhleService = NHLEService.getInstance();
          
    const standings = await nhleService.getStandingsNow();
    const scoreSchedule = date
      ? await nhleService.getScoreScheduleByDate(date)
      : await nhleService.getScoreScheduleNow();
    
    return NextResponse.json({ 
      scoreSchedule, 
      standings
    });
  } catch (error) {
    console.error('Error fetching NHL data: ', error);
    return NextResponse.json({ error: 'Failed to fetch NHL Schedule data' }, { status: 500 });
  }
} 