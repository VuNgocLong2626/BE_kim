import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { MealModule } from './meal/meal.module';


@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development','env'],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY || 'secret'
    }),
    CategoryModule,
    MealModule,
  ],
})
export class AppModule {}
