import ScheduleNavigation from './ScheduleNavigation';
import { GameWeek } from '@/types/schedule';
import { NHLStandings } from '@/types/standings';
import { headers } from 'next/headers';

export default async function SchedulePage() {
  const date = new Date();
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  try {
    const response = await fetch(`${baseUrl}/api/schedule?date=${date.toISOString().split('T')[0]}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch schedule data: ${response.statusText}`);
    }

    const data = await response.json();
    const scoreSchedule: GameWeek[] = data.scoreSchedule.gamesByDate;
    const standings: NHLStandings = data.standings;

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <ScheduleNavigation gamesThisWeek={scoreSchedule} standings={standings} initialDate={date} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading schedule:', error);
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Schedule</h1>
            <p className="text-gray-600">We're having trouble loading the schedule. Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }
}
