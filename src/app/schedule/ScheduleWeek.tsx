import { getScheduleNow, getStandingsNow } from '@/services/nhleService';
import Game from '@/components/game/Game';

export default async function ScheduleWeek() {
    const currentSchedule = await getScheduleNow();
    const standings = await getStandingsNow();

    // Get today's games
    const todayGames = currentSchedule.gameWeek[0].games;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-sans text-3xl font-bold mb-8 text-gray-800">
                    NHL Schedule for {new Date(currentSchedule.gameWeek[0].date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 [&>*]:h-fit">
                    {todayGames.map((game) => (
                        <div key={game.id} className="flex flex-col">
                            <Game 
                                game={game} 
                                standings={standings}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
