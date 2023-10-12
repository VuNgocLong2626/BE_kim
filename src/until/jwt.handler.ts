import { Injectable, Res } from "@nestjs/common";
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { payloadJWT } from "src/dto";
import { Response, Request } from 'express';


@Injectable()
export class JwtHandler {
    constructor(
        private jwtService: JwtService,
    ){

    }
    async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }
    
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }

    async createToken(
        payload: payloadJWT, 
        @Res({ passthrough: true }) response: Response,
        reference?: boolean
    ): Promise<string> {
        const time = reference ? process.env.REFRESH_TOKEN_TIME : process.env.ACCESS_TOKEN_TIME;
        const category  = reference ? 'refresh-token' : 'access-token';
        const token = await this.jwtService.signAsync(
            {
              ...payload,
            },
            { expiresIn: time },
          );
          response.cookie(category, token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });
        return token;
    }

    async clearToken(
        @Res({ passthrough: true }) response: Response,
    ){
        response.clearCookie('access-token');
        response.clearCookie('refresh-token');
    }
}