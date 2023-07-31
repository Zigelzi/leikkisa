/*
  Warnings:

  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Instruction` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Step";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instruction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,
    "order" INTEGER,
    "content" TEXT NOT NULL,
    CONSTRAINT "Instruction_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Instruction" ("createdAt", "gameId", "id") SELECT "createdAt", "gameId", "id" FROM "Instruction";
DROP TABLE "Instruction";
ALTER TABLE "new_Instruction" RENAME TO "Instruction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
