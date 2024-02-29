import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/services/users/users.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../typeorm/entities/UserProfile';
import { User } from '../typeorm/entities/User';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const { SECRET } = process.env;

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([User, UserProfile]),
        JwtModule.register({
            secret: SECRET,
            signOptions:{ expiresIn: '1h' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy]
})

export class AuthModule { }
