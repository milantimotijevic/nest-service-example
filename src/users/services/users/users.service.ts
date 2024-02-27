import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCredentialsParams, UserParams, UserProfileParams } from '../../utils/types';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfileDto';
import { CreateUserCredentialsDto } from '../../dtos/CreateUserCredentialsDto';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';
import { Repository } from 'typeorm';
import { UserProfile } from '../../../typeorm/entities/UserProfile';
import { UserCredentials } from '../../../typeorm/entities/UserCredentials';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(UserProfile) private userProfilesRepository: Repository<UserProfile>,
        @InjectRepository(UserCredentials) private userCredentialsRepository: Repository<UserCredentials>,
    ) { }

    async getAllUsers() {
        return this.usersRepository.find({ relations: ['profile', 'credentials'] });
    }

    async getUserById(id: number) {
        return this.usersRepository.findOne({ where: { id }, relations: ['profile', 'credentials'] });
    }

    async createUser(userParams: UserParams) {
        const newUser = this.usersRepository.create({
            ...userParams,
            createdAt: new Date(),
        });

        return this.usersRepository.save(newUser);
    }

    async createUserProfile(id: number, userProfileParams: UserProfileParams) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const newProfile = this.userProfilesRepository.create(userProfileParams);
        const savedProfile = await this.userProfilesRepository.save(newProfile);

        user.profile = savedProfile;

        return this.usersRepository.save(user);
    }

    private createSalt(length: number) {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }

    private hashPassword(password: string, salt: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(password + salt);
        return hash.digest('hex');
    }

    async createUserCredentials(id: number, password: string) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const salt = this.createSalt(20);

        const newCredentials = this.userCredentialsRepository.create({
            salt,
            password: this.hashPassword(password, salt),
        });

        const savedCredentials = await this.userCredentialsRepository.save(newCredentials);
        user.credentials = savedCredentials;

        return this.usersRepository.save(user);
    }
}
