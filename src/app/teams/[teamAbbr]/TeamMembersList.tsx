'use client';
import { Player } from '@/types/players';
import { useState, useEffect } from 'react';
import styles from './TeamMembersList.module.css';

interface TeamMembersListProps {
    teamAbbr: string;
}   

type SortField = 'sweaterNumber' | 'name' | 'positionCode' | 'birthDate' | 'birthCountry';
type SortDirection = 'asc' | 'desc';

export default function TeamMembersList({ teamAbbr }: TeamMembersListProps) {
    const [teamMembers, setTeamMembers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [positionFilter, setPositionFilter] = useState('ALL');
    const [sortField, setSortField] = useState<SortField>('sweaterNumber');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    useEffect(() => {
        setIsLoading(true);
        console.log('fetching team members for', teamAbbr);
        const fetchTeamMembers = async () => {
            try{
                const response = await fetch(`/api/players?teamAbbr=${teamAbbr}`);
                const data = await response.json();
                console.log('response from api/players', data);
                setTeamMembers(data);
            }
            catch(error){
                console.error('Error fetching team members:', error);
            }
            finally{
                setIsLoading(false);
            }
        };

        fetchTeamMembers();
    }, [teamAbbr]);

    if (isLoading || !teamMembers) {
        return <div className="text-center py-8">Loading...</div>;
    }

    // Get unique positions for the filter dropdown
    const positions = ['ALL', ...new Set(teamMembers.map(player => player.positionCode))];

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Filter and sort players
    const sortedAndFilteredPlayers = teamMembers
        .filter(player => {
            const fullName = `${player.firstName.default} ${player.lastName.default}`.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            // Check if search matches any of the fields
            const matchesSearch = 
                fullName.includes(searchLower) || 
                player.birthCountry.toLowerCase().includes(searchLower) ||
                player.positionCode.toLowerCase().includes(searchLower) ||
                (player.sweaterNumber?.toString() || '').includes(searchLower) ||
                player.birthDate.toLowerCase().includes(searchLower);
            
            const matchesPosition = positionFilter === 'ALL' || player.positionCode === positionFilter;
            return matchesSearch && matchesPosition;
        })
        .sort((a, b) => {
            let compareValue = 0;
            
            switch (sortField) {
                case 'sweaterNumber':
                    // If either number is missing, put it at the bottom
                    if (!a.sweaterNumber && !b.sweaterNumber) return 0;
                    if (!a.sweaterNumber) return 1;  // Always put missing numbers at the bottom
                    if (!b.sweaterNumber) return -1;
                    compareValue = parseInt(a.sweaterNumber.toString()) - parseInt(b.sweaterNumber.toString());
                    break;
                case 'name':
                    const nameA = `${a.firstName.default} ${a.lastName.default}`.toLowerCase();
                    const nameB = `${b.firstName.default} ${b.lastName.default}`.toLowerCase();
                    compareValue = nameA.localeCompare(nameB);
                    break;
                case 'positionCode':
                    compareValue = a.positionCode.localeCompare(b.positionCode);
                    break;
                case 'birthDate':
                    compareValue = new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
                    break;
                case 'birthCountry':
                    compareValue = a.birthCountry.localeCompare(b.birthCountry);
                    break;
            }

            return sortDirection === 'asc' ? compareValue : -compareValue;
        });

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return '↕️';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    // Add this helper function inside the component
    const getCountryFlag = (countryCode: string) => {
        // Special case for some common countries that might have different codes
        const specialCases: { [key: string]: string } = {
            'USA': 'US',
            'RUS': 'RU',
            'CAN': 'CA',
            'MEX': 'MX',
            'AUS': 'AU',
            'GBR': 'UK',
            'FRA': 'FR',
            'ITA': 'IT',
            'SWE': 'SE',
            'FIN': 'FI',
            'NOR': 'NO',
            'DEN': 'DK',
            'AUT': 'AT',
            'CZE': 'CZ',
            'SVK': 'SK',
            'POL': 'PL',
            'HUN': 'HU',
            'ROU': 'RO',
            'BUL': 'BG'
            // Add more special cases as needed
        };

        // Convert country code to 2-letter code
        const code = (specialCases[countryCode] || countryCode).slice(0, 2);
        
        // Regional indicator symbols are in range 127462 (🇦) to 127487 (🇿)
        return code
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0))
            .map(code => String.fromCodePoint(code))
            .join('');
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
                            {position}
                        </option>
                    ))}
                </select>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('sweaterNumber')} className={styles.sortable}>
                            Number {getSortIcon('sweaterNumber')}
                        </th>
                        <th onClick={() => handleSort('name')} className={styles.sortable}>
                            Name {getSortIcon('name')}
                        </th>
                        <th onClick={() => handleSort('positionCode')} className={styles.sortable}>
                            Position {getSortIcon('positionCode')}
                        </th>
                        <th onClick={() => handleSort('birthDate')} className={styles.sortable}>
                            Date of Birth {getSortIcon('birthDate')}
                        </th>
                        <th onClick={() => handleSort('birthCountry')} className={styles.sortable}>
                            Nationality {getSortIcon('birthCountry')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAndFilteredPlayers.map((player) => (
                        <tr key={player.id}>
                            <td>{player.sweaterNumber}</td>
                            <td>{player.firstName.default} {player.lastName.default}</td>
                            <td>{player.positionCode}</td>
                            <td>{player.birthDate}</td>
                            <td>{getCountryFlag(player.birthCountry)} {player.birthCountry}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
