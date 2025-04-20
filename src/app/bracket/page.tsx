import { headers } from "next/headers";
import { calculateContestantPointsAndRank, calculateTeamWins, NHLPlayoffBracket, Contestant } from "@/types/playoffBracket";
import styles from './BracketStandings.module.css';
import ContestantRow from './ContestantRow';

export default async function BracketPage() {
  const date = new Date();
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const bracketName = '2025 Yoffs Pool';

  try {
    const response = await fetch(`${baseUrl}/api/bracket?year=2025`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || `Failed to fetch schedule data: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.bracket || !data.contestants) {
      throw new Error('Invalid data structure received from API');
    }

    const playoffBracket: NHLPlayoffBracket = data.bracket;
    const contestants: Contestant[] = data.contestants;    
    const teamWins = calculateTeamWins(playoffBracket);
    const currentStandings = calculateContestantPointsAndRank(contestants, teamWins);

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="w-full bg-gray-700 py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center">
              <img 
                src={playoffBracket.bracketLogo} 
                alt="Playoff Bracket Logo" 
                className="max-w-full h-auto max-h-32 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className={styles.tableContainer}>
            <div className={styles.header}>
              <h1 className={styles.title}>{bracketName} Standings</h1>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Contestant</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {currentStandings.map((contestant) => (
                  <ContestantRow key={contestant.contestantName} contestant={contestant} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading Playoff Bracket:', error);
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading {bracketName}</h1>
            <p className="text-gray-600 mb-2">We're having trouble loading the Playoff Bracket.</p>
            <p className="text-gray-500 text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
            <p className="text-gray-500 text-sm mt-4">Please try again later or contact support if the issue persists.</p>
          </div>
        </div>
      </main>
    );
  }
}