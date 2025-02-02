import { IsEmail, IsInt, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    phone_number: string
    password: string

    @IsNotEmpty()
    confirm_password: string
}

export class LoginDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(3)
    password: string
}