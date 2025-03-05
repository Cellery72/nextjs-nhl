import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Team } from '@prisma/client';

export async function POST(request: Request) {
    try {
        const teams = await request.json() as Team[];
        
        // Create all teams in a single transaction
        const result = await prisma.$transaction(
            teams.map(team => 
                prisma.team.create({
                    data: {
                        fullName: team.fullName,
                        abbreviation: team.abbreviation
                    }
                })
            )
        );

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error creating teams:', error);
        return NextResponse.json(
            { error: 'Failed to create teams' },
            { status: 500 }
        );
    }
}