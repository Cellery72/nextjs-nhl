-- CreateTable
CREATE TABLE "Team" (
    "TeamId" TEXT NOT NULL,
    "Abbreviation" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("TeamId")
);

-- CreateTable
CREATE TABLE "Player" (
    "PlayerId" TEXT NOT NULL,
    "Number" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Position" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "Height" TEXT NOT NULL,
    "Weight" INTEGER NOT NULL,
    "ShootsCatches" TEXT NOT NULL,
    "YearsExperience" INTEGER,
    "DateOfBirth" TIMESTAMP(3) NOT NULL,
    "Summary" TEXT,
    "Salary" DOUBLE PRECISION,
    "TeamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("PlayerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_Abbreviation_key" ON "Team"("Abbreviation");

-- CreateIndex
CREATE INDEX "Player_TeamId_idx" ON "Player"("TeamId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_TeamId_fkey" FOREIGN KEY ("TeamId") REFERENCES "Team"("TeamId") ON DELETE RESTRICT ON UPDATE CASCADE;
