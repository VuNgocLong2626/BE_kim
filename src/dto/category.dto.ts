import { Expose, Type, plainToInstance } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { baseDTO } from './base';

export class categoryCreateDTO extends baseDTO {
  @IsNotEmpty()
  @Expose()
  name: string;
}

export class categoryDTO extends baseDTO {
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  url: string;

  @IsNotEmpty()
  @Expose()
  id: string;
}

export class categoryUpdateDTO extends baseDTO {
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  id: string;
}

// export class categorysDTO extends baseDTO {
//   @Type(() => categoryDTO)
//   categorys: categoryDTO[];
// }
// export type categorysDTO = categoryDTO[];
