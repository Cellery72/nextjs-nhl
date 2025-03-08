'use client';
import { useState } from 'react';
import ScheduleDay from './ScheduleDay';

interface ScheduleNavigationProps {
  initialDate?: Date;
}

export default function ScheduleNavigation({ initialDate = new Date() }: ScheduleNavigationProps) {
  // Start by setting the time to midnight to avoid timezone issues
  const normalizedInitialDate = new Date(initialDate);
  normalizedInitialDate.setHours(0, 0, 0, 0);
  
  const [selectedDate, setSelectedDate] = useState(normalizedInitialDate);

  // Generate an array of dates for the week (3 days before and 3 days after today)
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(normalizedInitialDate);
    date.setDate(normalizedInitialDate.getDate() - 3 + i);
    return date;
  });

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Schedule Navigation">
          {dates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  date.toDateString() === selectedDate.toDateString()
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        <ScheduleDay date={selectedDate} />
      </div>
    </div>
  );
} 