/*
  Warnings:

  - You are about to drop the column `content` on the `Instruction` table. All the data in the column will be lost.
  - Added the required column `action` to the `Instruction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instruction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,
    "order" INTEGER,
    "action" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "Instruction_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Instruction" ("createdAt", "gameId", "id", "order", "action") SELECT "createdAt", "gameId", "id", "order", "content" as "action" FROM "Instruction";
DROP TABLE "Instruction";
ALTER TABLE "new_Instruction" RENAME TO "Instruction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
