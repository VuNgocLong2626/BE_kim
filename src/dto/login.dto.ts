import { Expose, plainToInstance } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { baseDTO } from './base';

export class loginDTO extends baseDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;
}

export class loginResDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;
}

export class registerDTO extends baseDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'fullname' })
  @Length(4)
  fullname: string;
}

export class payloadJWT extends baseDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;
}

export class loginJWT extends baseDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  token: string;
}
