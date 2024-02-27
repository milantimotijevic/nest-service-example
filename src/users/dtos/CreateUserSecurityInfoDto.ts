import { IsEmail, IsNotEmpty, Matches } from 'class-validator'

export class CreateUserSecurityInfoDto {
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.',
    })
    password: string
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.',
    })
    confirmPassword: string
}