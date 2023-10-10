import { plainToInstance } from "class-transformer";

export class baseDTO {
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
        return plainToInstance(this, obj, {
            excludeExtraneousValues: true
        })
        
    }
}