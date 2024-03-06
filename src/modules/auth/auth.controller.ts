import { Body, Controller, Get, InternalServerErrorException, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { Payload } from '@nestjs/microservices';
import { loginUserDto } from '../auth/dto/user-login.dto';
import { userLoginInterface } from '../auth/interfaces/user-login.interface';
import { AuthService } from '../auth/auth.service';
import { SkipThrottle } from '@nestjs/throttler'
import { LoginAuthGuard } from './guards/login-auth.guard';
import { UsersLoginEntity } from './entities/user-login-entity';
import { usersInterface } from '../users/interfaces/users.interface';

@Controller('users')
@ApiTags('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name)
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    @SkipThrottle({ value: true })
    @UseGuards(LoginAuthGuard)
    @ApiBody({
        type: loginUserDto,
    })
    @ApiResponse({
        status: 200,
        type: UsersLoginEntity
    })
    async loginUser(@Body() body: loginUserDto) {
        const { email, password } = body;
        try {
            return await this.authService.loginUser(email, password);
        } catch (e) {
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            });
        }
    }
}