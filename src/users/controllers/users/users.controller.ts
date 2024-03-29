import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfileDto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto.password || !createUserDto.confirmPassword || createUserDto.password !== createUserDto.confirmPassword) {
            throw new HttpException('Pasword and confirmPassword fields must match', HttpStatus.BAD_REQUEST);
        }
        
        return this.userService.createUser({
            ...createUserDto,
            salt: null,
            profile: null,
        });
    }

    @Post(':id/profiles')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userService.createUserProfile(id, {...createUserProfileDto});
    }
}
