import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/name')
  async getName() {
    return 'ahihi';
  }

  @Post('/login')
  async login(
    @Body() login: loginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<loginDTO> {
    // response.cookie('access-token', 'asdasd', { httpOnly: true });
    const k =loginDTO.plainToClass(login);
    console.log(k.email);
    return loginDTO.plainToClass(await this.authService.login(login, response));
  }

  @Post('/register')
  async register(@Req() request: Request) {
    console.log(request.cookies['access-token']);
    return this.authService.register();
  }
}
