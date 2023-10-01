/*
  Warnings:

  - Added the required column `iconName` to the `GameType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "iconName" TEXT NOT NULL DEFAULT "telescope"
);
INSERT INTO "new_GameType" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "GameType";
DROP TABLE "GameType";
ALTER TABLE "new_GameType" RENAME TO "GameType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
