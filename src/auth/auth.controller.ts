import { Body, Controller, Get, Post, Res, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, registerDTO } from '../dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/name')
  async getName() {
    return 'ahihi';
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() login: loginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<loginDTO> {
    return loginDTO.plainToClass(await this.authService.login(login, response));
  }

  @Post('/register')
  @HttpCode(201)
  async register(
    @Body() register: registerDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<registerDTO> {
    return registerDTO.plainToClass(await this.authService.register(register, response));
  }

  @Get('/logout')
  @HttpCode(200)
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    await this.authService.logout(response);
    return {
      message: 'Logout an user'
    };
  }
}
