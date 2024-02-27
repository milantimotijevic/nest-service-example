import { IsEmail, IsNotEmpty, Matches } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string
}