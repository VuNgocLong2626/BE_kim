import { Expose, Type, plainToInstance } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsArray,
  IsNumber,
} from 'class-validator';
import { baseDTO } from './base';

export class mealDTO extends baseDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id_category: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @Type(() => Number)
  price: number;
}

export class mealResDTO extends baseDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id_category: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  price: number;

  @IsArray()
  @IsNotEmpty()
  @Expose()
  url: string[];
}
