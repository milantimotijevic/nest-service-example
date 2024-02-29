import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { UsersService } from '../users/services/users/users.service';
import { hashPassword } from '../utils/cryptography';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    /*
    In order for something to be imported like this, it HAS to be specified under
    "providers" for this module. You often also need to import the dependencies the module
    that the provider is coming from needs. It doesn't seem like you need to import the module
    itself. It's weird, but oh well

    Ok, nevermind, it looks like sometimes you need to import a whole module if you need
    to provide certain configuration for it and then the imported module's services don't
    need to be specified under "providers". Weird

    In order to import UsersService, I didn't need to import the UsersModule, but I had to
    import the ORM dependency and the UsersService as a provider. However, when importing
    JwtService, I only imported JwtModule (with some configuration) and didn't have to
    specify JwtService under AuthModule's providers. This is strange as hell...
    */
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(authPayloadDto: AuthPayloadDto) {
        const { username, password } = authPayloadDto;
        const user = await this.usersService.getUserByUsername(username);

        if (!user || !user.password || !user.salt) {
            return false;
        }

        const hashedPassword = hashPassword(password, user.salt);

        if (user.password !== hashedPassword) {
            throw false;
        }
        const {
            password: passwordFromDb,
            salt,
            ...userData
        } = user;

        return this.jwtService.sign(userData);
    }
}
