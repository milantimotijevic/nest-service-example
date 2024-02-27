import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfileDto';
import { CreateUserCredentialsDto } from '../../dtos/CreateUserCredentialsDto';

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
        return this.userService.createUser(createUserDto);
    }

    @Post(':id/profiles')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userService.createUserProfile(id, createUserProfileDto);
    }

    @Post(':id/credentials')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUserCredentials(@Param('id', ParseIntPipe) id: number, @Body() createUserCredentialsDto: CreateUserCredentialsDto) {
        return this.userService.createUserCredentials(id, createUserCredentialsDto);
    }
}
