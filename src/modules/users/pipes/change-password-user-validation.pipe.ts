import { InternalServerErrorException, Logger, PipeTransform, BadRequestException, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { changePasswordDto } from "../dto/change-password.dto";
import { hash } from 'bcrypt';

export class ChangePasswordUserValidationPipe implements PipeTransform {
    private readonly logger = new Logger(ChangePasswordUserValidationPipe.name)

    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService
    ) { }

    async transform(body: changePasswordDto): Promise<changePasswordDto> {
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
        return body;
    }
}
