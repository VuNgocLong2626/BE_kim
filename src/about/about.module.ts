import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { PrismaService, S3Service } from 'src/until';
import { LoggerMiddleware } from 'src/middleware';

@Module({
  providers: [AboutService, S3Service, PrismaService],
  controllers: [AboutController],
})
export class AboutModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/about/create', method: RequestMethod.POST });
  }
}
