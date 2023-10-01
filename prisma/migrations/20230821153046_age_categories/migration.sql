-- CreateTable
CREATE TABLE "AgeCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AgeCategoryToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AgeCategoryToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "AgeCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AgeCategoryToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgeCategoryToGame_AB_unique" ON "_AgeCategoryToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_AgeCategoryToGame_B_index" ON "_AgeCategoryToGame"("B");
