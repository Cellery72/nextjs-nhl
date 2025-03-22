'use client';
import { Player } from '@/types/players';
import { useState, useEffect } from 'react';
import styles from './TeamMembersList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TeamMembersListProps {
    teamAbbr: string;
}   

type SortField = 'headshot' | 'name' | 'sweaterNumber' | 'positionCode' | 'shootsCatches' | 'height' | 'weight' | 'birthDate' | 'birthplace';
type SortDirection = 'asc' | 'desc';

export default function TeamMembersList({ teamAbbr }: TeamMembersListProps) {
    const [teamMembers, setTeamMembers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [positionFilter, setPositionFilter] = useState('ALL');
    const [shootsFilter, setShootsFilter] = useState('ALL');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch(`/api/players?teamAbbr=${teamAbbr}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch team members');
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Invalid response format');
                }
                setTeamMembers(data);
            } catch (error) {
                console.error('Error fetching team members:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch team members');
                setTeamMembers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamMembers();
    }, [teamAbbr]);

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">Error: {error}</div>;
    }

    if (!teamMembers || teamMembers.length === 0) {
        return <div className="text-center py-8">No players found</div>;
    }

    // Get unique positions for the filter dropdown
    const positions = ['ALL', ...new Set(teamMembers.map(player => player.positionCode))];
    
    // Get unique shoots/catches options for filter dropdown
    const shootsOptions = ['ALL', ...new Set(teamMembers.map(player => player.shootsCatches))];

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Format height in feet and inches
    const formatHeight = (inches: number) => {
        const feet = Math.floor(inches / 12);
        const remainingInches = inches % 12;
        return `${feet}'${remainingInches}"`;
    };

    // Format weight with lbs
    const formatWeight = (pounds: number) => {
        return `${pounds} lbs`;
    };

    // Format date as MMM DD, YYYY
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Format birthplace as City, State/Province, Country
    const formatBirthplace = (player: Player) => {
        let birthplace = player.birthCity.default;
        
        if (player.birthStateProvince) {
            birthplace += `, ${player.birthStateProvince.default}`;
        }
        
        birthplace += `, ${player.birthCountry}`;
        
        return birthplace;
    };

    // Filter and sort players
    const sortedAndFilteredPlayers = teamMembers
        .filter(player => {
            const fullName = `${player.firstName.default} ${player.lastName.default}`.toLowerCase();
            const birthplace = formatBirthplace(player).toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            // Check if search matches any of the fields
            const matchesSearch = 
                fullName.includes(searchLower) || 
                birthplace.includes(searchLower) ||
                player.positionCode.toLowerCase().includes(searchLower) ||
                player.shootsCatches.toLowerCase().includes(searchLower) ||
                (player.sweaterNumber?.toString() || '').includes(searchLower);
            
            const matchesPosition = positionFilter === 'ALL' || player.positionCode === positionFilter;
            const matchesShoots = shootsFilter === 'ALL' || player.shootsCatches === shootsFilter;
            
            return matchesSearch && matchesPosition && matchesShoots;
        })
        .sort((a, b) => {
            let compareValue = 0;
            
            switch (sortField) {
                case 'headshot':
                    // Sort by name when sorting by headshot
                    const nameA = `${a.firstName.default} ${a.lastName.default}`.toLowerCase();
                    const nameB = `${b.firstName.default} ${b.lastName.default}`.toLowerCase();
                    compareValue = nameA.localeCompare(nameB);
                    break;
                case 'name':
                    const fullNameA = `${a.firstName.default} ${a.lastName.default}`.toLowerCase();
                    const fullNameB = `${b.firstName.default} ${b.lastName.default}`.toLowerCase();
                    compareValue = fullNameA.localeCompare(fullNameB);
                    break;
                case 'sweaterNumber':
                    // If either number is missing, put it at the bottom
                    if (!a.sweaterNumber && !b.sweaterNumber) return 0;
                    if (!a.sweaterNumber) return 1;  // Always put missing numbers at the bottom
                    if (!b.sweaterNumber) return -1;
                    compareValue = parseInt(a.sweaterNumber.toString()) - parseInt(b.sweaterNumber.toString());
                    break;
                case 'positionCode':
                    compareValue = a.positionCode.localeCompare(b.positionCode);
                    break;
                case 'shootsCatches':
                    compareValue = a.shootsCatches.localeCompare(b.shootsCatches);
                    break;
                case 'height':
                    compareValue = a.heightInInches - b.heightInInches;
                    break;
                case 'weight':
                    compareValue = a.weightInPounds - b.weightInPounds;
                    break;
                case 'birthDate':
                    compareValue = new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
                    break;
                case 'birthplace':
                    const birthplaceA = formatBirthplace(a);
                    const birthplaceB = formatBirthplace(b);
                    compareValue = birthplaceA.localeCompare(birthplaceB);
                    break;
            }

            return sortDirection === 'asc' ? compareValue : -compareValue;
        });

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return '↕️';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const handleRowClick = (player: Player) => {
        const firstName = player.firstName.default.replace(" ", "-");
        const lastName = player.lastName.default.replace(" ", "-");
        const playerSlug = `${firstName}-${lastName}-${player.id}`.toLowerCase();
        console.log(player);
        console.log(playerSlug);
        router.push(`/players/${playerSlug}`);
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Team Roster</h2>
                <div className={styles.countInfo}>
                    Showing {sortedAndFilteredPlayers.length} of {teamMembers.length} players
                </div>
            </div>
            
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                
                <select
                    value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value)}
                    className={styles.positionFilter}
                >
                    {positions.map(position => (
                        <option key={position} value={position}>
                            {position === 'ALL' ? 'All Positions' : position}
                        </option>
                    ))}
                </select>
                
                <select
                    value={shootsFilter}
                    onChange={(e) => setShootsFilter(e.target.value)}
                    className={styles.positionFilter}
                >
                    {shootsOptions.map(option => (
                        <option key={option} value={option}>
                            {option === 'ALL' ? 'Shoots/Catches' : `${option === 'L' ? 'Left' : 'Right'}`}
                        </option>
                    ))}
                </select>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('headshot')} className={styles.sortable}>
                            Photo {getSortIcon('headshot')}
                        </th>
                        <th onClick={() => handleSort('name')} className={styles.sortable}>
                            Name {getSortIcon('name')}
                        </th>
                        <th onClick={() => handleSort('sweaterNumber')} className={styles.sortable}>
                            # {getSortIcon('sweaterNumber')}
                        </th>
                        <th onClick={() => handleSort('positionCode')} className={styles.sortable}>
                            Pos {getSortIcon('positionCode')}
                        </th>
                        <th onClick={() => handleSort('shootsCatches')} className={styles.sortable}>
                            Shoots/Catches {getSortIcon('shootsCatches')}
                        </th>
                        <th onClick={() => handleSort('height')} className={styles.sortable}>
                            Height {getSortIcon('height')}
                        </th>
                        <th onClick={() => handleSort('weight')} className={styles.sortable}>
                            Weight {getSortIcon('weight')}
                        </th>
                        <th onClick={() => handleSort('birthDate')} className={styles.sortable}>
                            DOB {getSortIcon('birthDate')}
                        </th>
                        <th onClick={() => handleSort('birthplace')} className={styles.sortable}>
                            Birthplace {getSortIcon('birthplace')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAndFilteredPlayers.map((player) => (
                        <tr 
                            key={player.id} 
                            onClick={() => handleRowClick(player)}
                            className={styles.clickableRow}
                        >
                            <td className={styles.playerImage}>
                                {player.headshot ? (
                                    <Image 
                                        src={player.headshot} 
                                        alt={`${player.firstName.default} ${player.lastName.default}`}
                                        width={60} 
                                        height={60}
                                        className={styles.headshot}
                                    />
                                ) : (
                                    <div className={styles.placeholderImage}>No Image</div>
                                )}
                            </td>
                            <td>{player.firstName.default} {player.lastName.default}</td>
                            <td>{player.sweaterNumber}</td>
                            <td>{player.positionCode}</td>
                            <td>{player.shootsCatches === 'L' ? 'Left' : 'Right'}</td>
                            <td>{formatHeight(player.heightInInches)}</td>
                            <td>{formatWeight(player.weightInPounds)}</td>
                            <td>{formatDate(player.birthDate)}</td>
                            <td>{formatBirthplace(player)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
