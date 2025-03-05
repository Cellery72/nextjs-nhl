import { Suspense } from 'react';
import TeamsList from './TeamsList';


export default function TeamsPage() {

    function AddAllTeams() {



    }

    return (
        <Suspense fallback={<div>Loading teams...</div>}>
            <TeamsList />

        </Suspense>
    );
}
