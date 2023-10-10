import { Injectable, Res } from '@nestjs/common';
import { loginDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register() {
    return {
      message: 'Register an user',
    };
  }

  async login(
    loginDTO: loginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const access_token = await this.jwtService.signAsync(
      { ...loginDTO },
      { expiresIn: '15m' },
    );

    response.cookie('access-token', access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return {
      ...loginDTO,
      message: 'Login an user',
      access_token,
    };
  }
}
