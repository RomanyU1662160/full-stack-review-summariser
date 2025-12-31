/*
  Warnings:

  - Added the required column `high_lights` to the `summaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overall_rating` to the `summaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalReviews` to the `summaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTokens` to the `summaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `summaries` ADD COLUMN `high_lights` TEXT NOT NULL,
    ADD COLUMN `overall_rating` FLOAT NOT NULL,
    ADD COLUMN `totalReviews` INTEGER NOT NULL,
    ADD COLUMN `totalTokens` INTEGER NOT NULL;
