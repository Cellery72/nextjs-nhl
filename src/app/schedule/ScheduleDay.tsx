'use client';
import GameComponent from '@/components/game/Game';
import { ScheduleResponse, GameWeek } from '@/types/schedule';
import { NHLStandings } from '@/types/standings';
import { Game } from '@/types/game';
import { useState, useEffect } from 'react';

interface ScheduleDayProps {
  date: Date;
  gameDay?: GameWeek;
  standings: NHLStandings;
}

export default function ScheduleDay({ date, gameDay, standings }: ScheduleDayProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {1
      setIsLoading(true);


      try {
      

      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [date]);

  if (isLoading || !gameDay) {
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
          {gameDay.games.map((game) => (
            <div key={game.id} className="flex flex-col">
              <GameComponent 
                currentGame={game}
                homeStandings={standings.standings?.find(team => team.teamAbbrev.default === game.homeTeam.abbrev)}
                awayStandings={standings.standings?.find(team => team.teamAbbrev.default === game.awayTeam.abbrev)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
