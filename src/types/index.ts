export interface Team {
    TeamId: string;
    FullName: string;
    slug: string;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    players: Player[];
}

export interface Player {
    Id: string;
    Slug: string;
    Number: string;
    Name: string;
    Position: string;
    Age: string;
    Height: string;
    Weight: string;
    ShootsCatches: string;
    YearsExperience: number | null;
    DateOfBirth: string;
    Summary: string | null;
    Salary: number | null;
    TeamId: string;
}