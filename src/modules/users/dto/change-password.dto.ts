import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class changePasswordDto {
    @ApiProperty({
        type: String,
        example: '1234',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        example: '1234',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    hashPassword: string;
}