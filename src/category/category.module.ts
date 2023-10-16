import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { S3Service } from 'src/until/handle.s3';
import { PrismaService } from 'src/until';
import { LoggerMiddleware } from 'src/middleware';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, S3Service, PrismaService],
})
export class CategoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/category/create', method: RequestMethod.POST });
  }
}
