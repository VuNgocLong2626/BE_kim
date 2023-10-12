import { HttpException, Injectable, Res, HttpStatus } from '@nestjs/common';
import { loginDTO, payloadJWT, registerDTO } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { PrismaService } from 'src/until';
import { JwtHandler } from 'src/until/jwt.handler';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private jwthandler: JwtHandler,
  ) {}

  async register(
    registerDTO: registerDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const user = await this.prisma.account.findUnique({
      where: {
        email: registerDTO.email,
      },
    });
    if (user) {
      throw new HttpException(
        { message: 'Email already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await this.jwthandler.hashPassword(registerDTO.password);
    const account = await this.prisma.account.create({
      data: {
        ...registerDTO,
        password: hashPassword,
      },
    });

    const payload: payloadJWT = payloadJWT.plainToClass({
      ...account,
    });
    const _ = await this.jwthandler.createToken(payload, response);

    return account;
  }

  async login(
    loginDTO: loginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    // kiem tra email
    const user = await this.prisma.account.findUnique({
      where: {
        email: loginDTO.email,
      },
    });

    if (!user) {
      throw new HttpException(
        { message: 'Account is not exist.' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    // kiem tra password
    const verify = await this.jwthandler.comparePassword(
      loginDTO.password,
      user.password,
    );
    if (!verify) {
      throw new HttpException(
        { message: 'Password doese not correct.' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    // tao token va luu cookie
    const payload: payloadJWT = payloadJWT.plainToClass(user);
    const _ = await this.jwthandler.createToken(payload, response);

    return user;
  }

  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    response.clearCookie('access-token');
  }
}
