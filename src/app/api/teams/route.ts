import { NextResponse } from 'next/server';
import { Team } from '@/types';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';


const prisma = new PrismaClient();

export async function GET() {
    try {
        const teamsDirectory = path.join(process.cwd(), 'public/teams');
        const files = await fs.readdir(teamsDirectory);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        const teams: Team[] = await Promise.all(
            jsonFiles.map(async (file) => {
                const content = await fs.readFile(path.join(teamsDirectory, file), 'utf8');
                return JSON.parse(content) as Team;
            })
        );

        return NextResponse.json(teams);
    } catch (error) {
        console.error('Error reading teams:', error);
        return NextResponse.json({ error: 'Failed to load teams' }, { status: 500 });
    }
    
    /*try {
         const teams = await prisma.team.findMany({include:{players:true}});
        return NextResponse.json(teams, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch teams' },
            { status: 500 }
        );
    } */
}