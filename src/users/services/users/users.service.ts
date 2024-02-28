import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserParams, UserProfileParams } from '../../utils/types';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';
import { Repository } from 'typeorm';
import { UserProfile } from '../../../typeorm/entities/UserProfile';
import { UserCredentials } from '../../../typeorm/entities/UserCredentials';
import { createSalt, hashPassword } from '../../../utils/cryptography';

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

    async createUserCredentials(id: number, password: string) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const salt = createSalt(20);

        const newCredentials = this.userCredentialsRepository.create({
            salt,
            password: hashPassword(password, salt),
        });

        const savedCredentials = await this.userCredentialsRepository.save(newCredentials);
        user.credentials = savedCredentials;

        return this.usersRepository.save(user);
    }
}
