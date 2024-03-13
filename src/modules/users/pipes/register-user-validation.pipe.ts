import { BadRequestException, Inject, InternalServerErrorException, Logger, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createUserDto } from "../dto/create-users.dto";
import { AuthService } from "src/modules/auth/auth.service";
import { CreateUserInterface } from "../interfaces/create-user.interfaces";
import { hash } from 'bcrypt';

export class registerUserValidationPipe implements PipeTransform {
    private readonly logger = new Logger(registerUserValidationPipe.name)

    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        private readonly authService: AuthService
    ) {}

    async transform(body: createUserDto): Promise<createUserDto> {
        let userEmail: CreateUserInterface
        try {
            userEmail = await this.authService.getByEmail(body.email)
        } catch (e) {
            this.logger.error(
                `Error email: ${e?.message ?? JSON.stringify(e)}`,
            );
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            });
        }

        if(userEmail) {
            throw new BadRequestException(`Email ${body.email} already exists`)
        }

        let usernameUser: CreateUserInterface
        try {
            usernameUser = await this.authService.getByUsername(body.username)
        } catch (e) {
            this.logger.error(
                `Error username: ${e?.message ?? JSON.stringify(e)}`,
            );
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            });
        }

        if(usernameUser) {
            throw new BadRequestException(`Email ${body.username} already exists`)
        }

        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Password and confirm password do not match.");
        }

        const hashSize = this.configService.get<string>('authentication.hashSize');
        let hashPassword: string;
        try {
            hashPassword = await hash(body.password, hashSize);
        } catch (e) {
            this.logger.error(
                `Error hashing password: ${e?.message ?? JSON.stringify(e)}`,
            );
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            });
        }

        body.hashPassword = hashPassword;
        return body
    }
}