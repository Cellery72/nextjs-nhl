'use client';
import { useState } from 'react';
import { NHLGame } from '@/types/schedule';
import { StandingsTeam } from '@/types/standings';
import Image from 'next/image';
import Link from 'next/link';

interface GameProps {
    game: NHLGame;
    homeStandings?: StandingsTeam;
    awayStandings?: StandingsTeam;
}

export default function Game({ game, homeStandings, awayStandings }: GameProps) {
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
                        {game.homeTeam.commonName.default} vs. {game.awayTeam.commonName.default}
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

            {/* Expanded Content */}
            {isExpanded && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center">
                        {/* Home Team */}
                        <div className="text-center flex-1">
                            <Link href={`/teams/${game.homeTeam.abbrev}`} className="block">
                                <div className="w-20 h-20 mx-auto mb-3 relative">
                                    <Image
                                        src={`https://assets.nhle.com/logos/nhl/svg/${game.homeTeam.abbrev}_light.svg`}
                                        alt={` ${game.homeTeam.commonName.default} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                                    {game.homeTeam.placeName.default + ' ' + game.homeTeam.commonName.default}
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

                        <div className="text-xl font-bold text-gray-400 px-4">VS</div>

                        {/* Away Team */}
                        <div className="text-center flex-1">
                            <Link href={`/teams/${game.awayTeam.abbrev}`} className="block">
                                <div className="w-20 h-20 mx-auto mb-3 relative">
                                    <Image
                                        src={`https://assets.nhle.com/logos/nhl/svg/${game.awayTeam.abbrev}_light.svg`}
                                        alt={`${game.awayTeam.commonName.default} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                                    {game.awayTeam.placeName.default + ' ' + game.awayTeam.commonName.default}
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
                </div>
            )}
        </div>
    );
} 