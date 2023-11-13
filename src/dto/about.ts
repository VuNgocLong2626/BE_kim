import { Expose, plainToInstance } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { baseDTO } from './base';

export class aboutDTO extends baseDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  content: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;
}
