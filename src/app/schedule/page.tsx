import { Suspense } from 'react';
import ScheduleWeek from './ScheduleWeek';

export default function TeamsPage() {
    return (
        <Suspense fallback={<div>Loading current schedule...</div>}>
            <ScheduleWeek />
        </Suspense>
    );
}
