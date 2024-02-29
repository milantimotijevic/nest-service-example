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
        // this will be available under req.user for all endpoints using this strategy (guard)
        return {
            ...payload,
            andCats: true, // example of "extra logic". otherwise, just return the payload, or use AuthGuard('jwt')
        };
    }
}