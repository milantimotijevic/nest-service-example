import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const { SECRET } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET,
        });
    }

    async validate(payload: any) {
        /*
        this will be available under req.user for all endpoints using this strategy
        regardless of whether it's called through our custom guard or AuthGuard('jwt')
        */
        return {
            ...payload,
            andCats: true,
        };
    }
}