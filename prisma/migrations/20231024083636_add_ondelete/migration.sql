-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_id_meal_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_id_category_fkey";

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_meal_fkey" FOREIGN KEY ("id_meal") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
