import { Expose, Type, plainToInstance } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsArray,
  IsNumber,
  IsBoolean,
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

  @IsString()
  @IsNotEmpty()
  @Expose()
  price: string;
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

export class mealDeleteDTO extends baseDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;
}

export class mealUpdateSellerDTO extends baseDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  best_seller: boolean;
}
