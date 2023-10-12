import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/until';
import { LoggerMiddleware } from 'src/middleware';
import { JwtHandler } from 'src/until/jwt.handler';

@Module({
    providers: [
        AuthService, 
        PrismaService,
        JwtHandler
    ],
    controllers: [AuthController],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(LoggerMiddleware)
          .forRoutes({ path: '/auth/name', method: RequestMethod.GET });
      }
}
