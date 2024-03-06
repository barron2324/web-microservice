import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBadRequestResponse  } from '@nestjs/swagger';
import { Payload } from '@nestjs/microservices';
import { UsersService } from "./users.service";
import { createUserDto } from './dto/create-users.dto';

@Controller('users')
@ApiTags('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
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