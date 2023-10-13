import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { S3Service } from 'src/until/handle.s3';
import { PrismaService } from 'src/until';
import { LoggerMiddleware } from 'src/middleware';
import { JwtHandler } from 'src/until/jwt.handler';


@Module({
  controllers: [UserController],
  providers: [UserService, S3Service, PrismaService, JwtHandler]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserController);
  }
}
