'use client';
import GameComponent from '@/components/game/Game';
import { Game, ScheduleResponse } from '@/types/schedule';
import { Standings } from '@/types/standings';
import { useState, useEffect } from 'react';

interface ScheduleDayProps {
  date: Date;
}

interface ScheduleData {
  games: Game[];
  standings: Standings;
  scoreSchedule: ScheduleResponse;
}

export default function ScheduleDay({ date }: ScheduleDayProps) {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      console.log('fetching games for date', date);
      try {
        const response = await fetch(`/api/schedule?date=${date.toISOString().split('T')[0]}`);
        const data = await response.json();

        const dateString = date.toISOString().split('T')[0];
        const gamesForDate = data.scoreSchedule.gamesByDate.find(
          (dayData: { date: string }) => dayData.date === dateString
        )?.games || [];

        setScheduleData({
          games: gamesForDate.length > 0 ? gamesForDate : data.schedule.gameWeek[0].games,
          standings: data.standings,
          scoreSchedule: data.scoreSchedule
        });

      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [date]);

  if (isLoading || !scheduleData) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-120">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-sans text-3xl font-bold mb-8 text-gray-800 text-center 
          py-4 max-w-3xl mx-auto flex items-center justify-center gap-2">
          🥅 NHL Schedule 🥅
        </h1>
        <h2 className="text-center text-lg text-gray-600 mb-8">
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 [&>*]:h-fit">
          {scheduleData.games.map((game) => (
            <div key={game.id} className="flex flex-col">
              <GameComponent 
                game={game}
                homeStandings={scheduleData.standings.standings?.find(team => team.teamAbbrev.default === game.homeTeam.abbrev)}
                awayStandings={scheduleData.standings.standings?.find(team => team.teamAbbrev.default === game.awayTeam.abbrev)}
                scoreSchedule={scheduleData.scoreSchedule}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
