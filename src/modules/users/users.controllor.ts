import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBadRequestResponse, ApiResponse  } from '@nestjs/swagger';
import { Payload } from '@nestjs/microservices';
import { UsersService } from "./users.service";
import { createUserDto } from './dto/create-users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { userEntyty } from './entities/user.entity';
import ReqUser from 'src/decorators/req-user.decorator';
import { usersInterface } from './interfaces/users.interface';

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

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        type: userEntyty
    })
    async getMe(@ReqUser() user: usersInterface): Promise<userEntyty> {
        return user
    }
}