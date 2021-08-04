import { IsEmail, IsString } from "class-validator";

export default class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}