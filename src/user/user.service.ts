import { Injectable, Req } from '@nestjs/common';
import { loginDTO } from 'src/dto';
import { Request } from 'express';
import { PrismaService } from 'src/until';
import * as jwt from 'jsonwebtoken';
import { UserDTO, UserUpdatePasswordDTO } from 'src/dto/user.dto';
import { JwtHandler } from 'src/until/jwt.handler';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwthandler: JwtHandler,
    ) {}

  async getUsersAll(): Promise<loginDTO[]> {
    return await this.prisma.account.findMany();
  }

  async getUser(@Req() req: Request): Promise<UserDTO> {
    const token = req.cookies['access-token'];

    const decoded = jwt.verify(token, process.env.SECRET_KEY) as jwt.JwtPayload;

    const currentUser = await this.prisma.account.findUnique({
      where: {
        id: decoded.id,
      },
    });
    return UserDTO.plainToClass(currentUser);
  }

  async getUsersChangePassword(
    @Req() req: Request,
    userUpdate: UserUpdatePasswordDTO,
  ): Promise<void> {
    const token = req.cookies['access-token'];
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as jwt.JwtPayload;
    const hashPassword = await this.jwthandler.hashPassword(userUpdate.password);
    const _ = await this.prisma.account.update({
      where: {
        id: decoded.id,
      },
      data: {
        password: hashPassword,
      },
    });
  }

}
