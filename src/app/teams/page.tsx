import { Suspense } from 'react';
import TeamsList from './TeamsList';
import styles from './TeamsPage.module.css';

export const metadata = {
    title: 'NHL Teams',
    description: 'List of NHL Teams',
};

export default function TeamsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>NHL Teams 🏒</h1>
                <Suspense fallback={<div>Loading teams...</div>}>
                    <TeamsList />
                </Suspense>
            </div>
        </div>
    );
}
