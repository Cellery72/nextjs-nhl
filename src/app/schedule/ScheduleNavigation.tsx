'use client';
import { useState, useEffect } from 'react';
import ScheduleDay from './ScheduleDay';
import { GameWeek } from '@/types/schedule';
import { NHLStandings as NHLStandings } from '@/types/standings';

interface ScheduleNavigationProps {
  gamesThisWeek: GameWeek[];
  standings: NHLStandings;
  initialDate?: Date;
}

export default function ScheduleNavigation({ gamesThisWeek, standings, initialDate }: ScheduleNavigationProps) {
  
  const findGameDay = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);
    
    return gamesThisWeek.find((day) => {
      const dayDate = new Date(day.date);
      dayDate.setUTCHours(0, 0, 0, 0);
      return dayDate.getTime() === normalizedDate.getTime();
    });
  }

  
  const normalizedInitialDate = initialDate ? new Date(initialDate) : new Date();
  normalizedInitialDate.setHours(0, 0, 0, 0);
  
  // Find the first available game day if no initial date is provided
  const defaultGameDay = !initialDate ? gamesThisWeek.find(day => {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate.getTime() >= normalizedInitialDate.getTime();
  }) : null;

  const [selectedDate, setSelectedDate] = useState(defaultGameDay ? new Date(defaultGameDay.date) : normalizedInitialDate);
  const [selectedGameDay, setSelectedGameDay] = useState(findGameDay(selectedDate));

  useEffect(() => {
    setSelectedGameDay(findGameDay(selectedDate));
  }, [selectedDate]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Schedule Navigation">
          {gamesThisWeek.map((day) => {
            // Use ISO string for key and comparison to ensure consistency
            const dateKey = day.date;
            const selectedDateKey = selectedDate.toISOString().split('T')[0];
            
            // Format the date string
            const formatDate = (dateStr: string) => {
              const date = new Date(dateStr);
              return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              });
            };

            // Compare dates by converting both to midnight local time
            const isSelected = (() => {
              const dayDate = new Date(day.date);
              dayDate.setHours(0, 0, 0, 0);
              const selectedDateLocal = new Date(selectedDate);
              selectedDateLocal.setHours(0, 0, 0, 0);
              return dayDate.getTime() === selectedDateLocal.getTime();
            })();
            
            return (
              <button
                key={dateKey}
                onClick={() => setSelectedDate(new Date(dateKey))}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    isSelected
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {formatDate(day.date)}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-4">
        <ScheduleDay date={selectedDate} gameDay={selectedGameDay} standings={standings} />
      </div>
    </div>
  );
} 