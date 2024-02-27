import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { UserProfile } from '../typeorm/entities/UserProfile';
import { UserCredentials } from '../typeorm/entities/UserCredentials';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserProfile, UserCredentials])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
