import { teamService } from '@/services/teamService';

export default async function TeamsList() {
    let teams = await teamService.getAllTeams();

    return (
        <div>
            <h1 className="font-sans text-2xl font-bold mb-4">Teams</h1>
            <ul className="space-y-2">
                {teams.map((team) => (
                    <li key={team.TeamId} className="p-4">
                        <h2 className="text-lg font-semibold text-red">{team.FullName}</h2  >
                    </li>
                ))}
            </ul>
        </div>
    );
}
