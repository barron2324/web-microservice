import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Payload } from '@nestjs/microservices';
import { UsersService } from "./users.service";
import { createUserDto } from './dto/create-users.dto';
import { CreateUserInterface } from './interfaces/create-user.interfaces';

@Controller('users')
@ApiTags('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('register')
    @ApiBody({
        type: createUserDto,
    })
    async createUser(@Body() body: createUserDto): Promise<void> {
        await this.usersService.registerUser(body);
    }

    @Get('ping')
    async ping(): Promise<unknown> {
        return this.usersService.ping();
    }
}