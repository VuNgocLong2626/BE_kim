import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { S3Service } from 'src/until/handle.s3';
import { PrismaService } from 'src/until';


@Module({
  controllers: [CategoryController],
  providers: [CategoryService, S3Service, PrismaService]
})
export class CategoryModule {}
