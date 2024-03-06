import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginUserDto {
    @ApiProperty({
        type: String,
        example: 'example@gmail.com',
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        example: '1234',
        required: true
    })
    @IsNotEmpty()
    password: string;
}