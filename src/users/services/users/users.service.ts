import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserType, UserProfileType } from '../../utils/types';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';
import { Repository } from 'typeorm';
import { UserProfile } from '../../../typeorm/entities/UserProfile';
import { createSalt, hashPassword } from '../../../utils/cryptography';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(UserProfile) private userProfilesRepository: Repository<UserProfile>,
    ) { }

    async getAllUsers() {
        return this.usersRepository.find({ relations: ['profile'] });
    }

    async getUserById(id: number) {
        return this.usersRepository.findOne({ where: { id }, relations: ['profile'] });
    }

    async getUserByUsername(username: string) {
        return this.usersRepository.findOne({ where: { username } });
    }

    async createUser(userParams: UserType) {
        const salt = createSalt(20);

        const password = hashPassword(userParams.password, salt);

        const newUser = this.usersRepository.create({
            ...userParams,
            salt,
            password,
            createdAt: new Date(),
        });

        return this.usersRepository.save(newUser);
    }

    async createUserProfile(id: number, userProfileParams: UserProfileType) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const newProfile = this.userProfilesRepository.create(userProfileParams);
        const savedProfile = await this.userProfilesRepository.save(newProfile);

        user.profile = savedProfile;

        return this.usersRepository.save(user);
    }
}
