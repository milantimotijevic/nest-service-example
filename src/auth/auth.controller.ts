import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

    @Post('login')
    //@UseGuards(AuthGuard('local')) // stick with this one if you don't custom logic WHEN determining the boolean value (e.g. checking roles, etc)
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        return req.user;
    }

    @Get('status')
    //@UseGuards(AuthGuard('jwt'))
    @UseGuards(JwtAuthGuard)
    getStatus(@Req() req: Request) {
        return req.user;
    }
}
