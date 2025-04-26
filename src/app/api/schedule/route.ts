import { NextResponse } from 'next/server';
import { NHLEService } from '@/services/nhleService';
import {format, toZonedTime} from 'date-fns-tz';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date'); // e.g. "2025-04-26"
    const timeZone = searchParams.get('tz') || 'UTC'; // default to UTC if not sent

    if (!dateParam){
      return new Response('Missing date', {status: 400});
    }

    const date = new Date(dateParam);
    const zonedDate = toZonedTime(date, timeZone);
    const formattedDate = format(zonedDate, 'yyyy-MM-dd', {timeZone});

    const nhleService = NHLEService.getInstance();
          
    const standings = await nhleService.getStandingsNow();
    const scoreSchedule = await nhleService.getScoreScheduleByDate(formattedDate);
    
    return NextResponse.json({ 
      scoreSchedule, 
      standings
    });
  } catch (error) {
    console.error('Error fetching NHL data: ', error);
    return NextResponse.json({ error: 'Failed to fetch NHL Schedule data' }, { status: 500 });
  }
} 