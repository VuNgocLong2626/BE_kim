import { Expose, plainToInstance } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";
import { baseDTO } from "./base";

export class UserDTO extends baseDTO {

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
    @Length(8)
    @Expose()
    fullname: string;
}


export class UserUpdatePasswordDTO extends baseDTO {
    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;
}