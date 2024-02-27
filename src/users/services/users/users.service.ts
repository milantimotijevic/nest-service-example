import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../utils/types';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfileDto';
import { CreateUserCredentialsDto } from '../../dtos/CreateUserCredentialsDto';
import * as crypto from 'crypto';

const users: User[] = [];

@Injectable()
export class UsersService {

    async getAllUsers() {
        return users;
    }

    async getUserById(id: string) {
        return users[id];
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = { ... createUserDto, profile: null, credentials: null };
        users.push(user);
        return user;
    }

    createUserProfile(id: string, createUserProfileDto: CreateUserProfileDto) {
        const user = users[id];

        if (!user) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        user.profile = createUserProfileDto;

        return user;
    }

    private createSalt(length: number) {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }

    private hashPassword(password: string, salt: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(password + salt); // Combine password and salt
        return hash.digest('hex'); // Convert hash to hexadecimal string
    }

    createUserCredentials(id: string, createUserCredentialsDto: CreateUserCredentialsDto) {
        const user = users[id];

        if (!user) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const { password, confirmPassword } = createUserCredentialsDto;

        if (!password || !confirmPassword || password !== confirmPassword) {
            throw new HttpException('Pasword and confirmPassword fields must match', HttpStatus.BAD_REQUEST);
        }

        const salt = this.createSalt(20);
        const hashedPassword = this.hashPassword(password, salt);

        user.credentials = {
            salt,
            password: hashedPassword,
        }

        const { credentials, ...userData } = user;

        return userData;
    }
}
