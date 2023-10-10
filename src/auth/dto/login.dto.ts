import { Expose, plainToInstance } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";
import { baseDTO } from "./base";

export class loginDTO extends baseDTO {

    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;

    // static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
    //     return plainToInstance(this, obj, {
    //         excludeExtraneousValues: true
    //     })
        
    // }
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