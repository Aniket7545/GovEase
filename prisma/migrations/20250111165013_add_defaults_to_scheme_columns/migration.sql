/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[aadhaarNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[panNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN "verifiedData" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "aadhaarNumber" TEXT;
ALTER TABLE "User" ADD COLUMN "address" TEXT;
ALTER TABLE "User" ADD COLUMN "dateOfBirth" DATETIME;
ALTER TABLE "User" ADD COLUMN "gender" TEXT;
ALTER TABLE "User" ADD COLUMN "panNumber" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Profile";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SchemeDocument" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "schemeId" INTEGER NOT NULL,
    CONSTRAINT "SchemeDocument_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SchemeApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "schemeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SchemeApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SchemeApplication_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scheme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "ministry" TEXT NOT NULL DEFAULT 'Unknown',
    "eligibility" TEXT NOT NULL,
    "benefits" TEXT NOT NULL DEFAULT 'Not specified',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Scheme" ("createdAt", "description", "eligibility", "id", "name", "updatedAt") SELECT "createdAt", "description", "eligibility", "id", "name", "updatedAt" FROM "Scheme";
DROP TABLE "Scheme";
ALTER TABLE "new_Scheme" RENAME TO "Scheme";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_aadhaarNumber_key" ON "User"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_panNumber_key" ON "User"("panNumber");
