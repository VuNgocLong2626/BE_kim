import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { PrismaService, JwtHandler, S3Service } from 'src/until';

@Module({
  providers: [MealService, S3Service, PrismaService, JwtHandler],
  controllers: [MealController],
  exports: [MealService],
})
export class MealModule {}
