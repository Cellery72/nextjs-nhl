'use client';
import { useState } from 'react';
import { Game as GameType, ScheduleResponse } from '@/types/schedule';
import { StandingsTeam } from '@/types/standings';
import Image from 'next/image';
import Link from 'next/link';

interface GameProps {
    game: GameType;
    homeStandings?: StandingsTeam;
    awayStandings?: StandingsTeam;
    scoreSchedule?: ScheduleResponse;
}

export default function Game({ game, homeStandings, awayStandings, scoreSchedule }: GameProps) {
    if(game.gameState === "LIVE" || game.gameState==="CRIT") {
        console.log(game);
    }
    const [isExpanded, setIsExpanded] = useState(false);

    // Convert UTC to EST
    const formatGameTime = (utcTime: string) => {
        const date = new Date(utcTime);
        return date.toLocaleString('en-US', {
            timeZone: 'America/New_York',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center cursor-pointer group"
                onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                        {game.homeTeam.commonName?.default || game.homeTeam.name?.default || ''} vs. {game.awayTeam.commonName?.default || game.awayTeam.name?.default || ''}
                    </h2>
                    <p className="text-gray-600 text-sm font-medium">
                        {formatGameTime(game.startTimeUTC)} EST
                    </p>
                </div>
                <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={isExpanded ? 'Show less' : 'Show more'}>
                    <svg
                        className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {isExpanded && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center">
                        {/* Home Team */}
                        <div className="text-center flex-1">
                            <Link href={`/teams/${game.homeTeam.abbrev}`} className="block">
                                <div className="w-20 h-20 mx-auto mb-3 relative">
                                    <Image
                                        src={`https://assets.nhle.com/logos/nhl/svg/${game.homeTeam.abbrev}_light.svg`}
                                        alt={` ${game.homeTeam.commonName?.default || game.homeTeam.name?.default || ''} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                                    {(game.homeTeam.placeName?.default || '') + ' ' + (game.homeTeam.commonName?.default || game.homeTeam.name?.default || '')}
                                </p>
                            </Link>
                            {homeStandings && (
                                <p className="text-sm text-gray-600 font-medium">
                                    {homeStandings && (
                                        `L10: ${homeStandings.l10Wins}-${homeStandings.l10Losses}-${homeStandings.l10OtLosses}`
                                    )}
                                </p>
                            )}
                        </div>

                        {/* Home Team Score - Only show if game is LIVE */}
                        <div className="text-center px-4">
                            {(game.gameState === "LIVE" || game.gameState==="CRIT") && (
                                <div className="text-3xl font-bold text-gray-800">
                                    {game.homeTeam?.score || '0'}
                                </div>
                            )}
                        </div>

                        <div className="text-xl font-bold text-gray-400 px-4">VS</div>

                        {/* Away Team Score - Only show if game is LIVE */}
                        <div className="text-center px-4">
                            {(game.gameState === "LIVE" || game.gameState==="CRIT") && (
                                <div className="text-3xl font-bold text-gray-800">
                                    {game.awayTeam?.score || '0'}
                                </div>
                            )}
                        </div>

                        {/* Away Team */}
                        <div className="text-center flex-1">
                            <Link href={`/teams/${game.awayTeam.abbrev}`} className="block">
                                <div className="w-20 h-20 mx-auto mb-3 relative">
                                    <Image
                                        src={`https://assets.nhle.com/logos/nhl/svg/${game.awayTeam.abbrev}_light.svg`}
                                        alt={`${game.awayTeam.commonName?.default || game.awayTeam.name?.default || ''} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                                    {(game.awayTeam.placeName?.default || '') + ' ' + (game.awayTeam.commonName?.default || game.awayTeam.name?.default || '')}
                                </p>
                            </Link>
                            {awayStandings && (
                                <p className="text-sm text-gray-600 font-medium">
                                    {awayStandings && (
                                        `L10: ${awayStandings.l10Wins}-${awayStandings.l10Losses}-${awayStandings.l10OtLosses}`
                                    )}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Game Period and Time Remaining - Only show if game is LIVE */}
                    {(game.gameState === "LIVE" || game.gameState==="CRIT" )&& (
                        <div className="mt-4 text-center">
                            <p className="text-md font-semibold text-gray-700">
                                {(() => {
                                    // Find the game in the new structure with gamesByDate
                                    let liveGame = null;
                                    if (scoreSchedule) {
                                        for (const dayData of scoreSchedule.gamesByDate || []) {
                                            const foundGame = dayData.games.find(g => g.id === game.id);
                                            if (foundGame) {
                                                liveGame = foundGame;
                                                break;
                                            }
                                        }
                                    }
                                    
                                    if (!liveGame) return null;
                                    
                                    const period = liveGame.period;
                                    let periodText = '';
                                    
                                    if (period === 1) periodText = '1st Period';
                                    else if (period === 2) periodText = '2nd Period';
                                    else if (period === 3) periodText = '3rd Period';
                                    else if (period === 4) periodText = 'Overtime';
                                    else if (period === 5) periodText = 'Shootout';
                                    else periodText = `Period ${period}`;
                                    
                                    return `${periodText} - ${liveGame.clock?.timeRemaining || ''} remaining`;
                                })()}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 