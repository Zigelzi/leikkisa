/*
  Warnings:

  - Added the required column `isLiked` to the `GameLike` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLiked" BOOLEAN NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "GameLike_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameLike" ("createdAt", "gameId", "id") SELECT "createdAt", "gameId", "id" FROM "GameLike";
DROP TABLE "GameLike";
ALTER TABLE "new_GameLike" RENAME TO "GameLike";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
