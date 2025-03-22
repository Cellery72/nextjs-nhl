import { NHLEService } from '@/services/nhleService';
import { notFound, redirect } from 'next/navigation';
import PlayerDetails from './PlayerDetails';

export const metadata = {
    title: 'NHL Players',
    description: 'List of NHL Players',
};

function parsePlayerId(slug: string): number {
    // Extract the numeric ID from the end of the slug
    const match = slug.match(/-(\d+)$/);
    if (!match) {
        throw new Error('Invalid player ID format');
    }
    return parseInt(match[1], 10);
}

export default async function PlayerPage({ params }: { params: Promise<{ playerSlug: string }> }) {
    const playerSlug = (await params).playerSlug;
    const nhleService = NHLEService.getInstance();
    
    try {
        const playerId = parsePlayerId(playerSlug);
        const player = await nhleService.getPlayerLanding(playerId);

        if (!player) {
            notFound();
        }
        
        // redirect if we're not on the correct URL for given player
        if (playerSlug !== player.playerSlug && !playerSlug.includes(player.playerSlug)) {
            redirect(`/players/${player.playerSlug}`);
        }

        return <PlayerDetails player={player} />;
    } catch (error) {
        // If we get a redirect error, we should let it propagate
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        notFound();
    }
}
