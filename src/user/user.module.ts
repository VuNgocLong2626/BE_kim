import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService, JwtHandler, S3Service } from 'src/until';
import { LoggerMiddleware } from 'src/middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, S3Service, PrismaService, JwtHandler],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
