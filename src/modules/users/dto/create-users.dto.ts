import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
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
        example: 'example123',
        required: true
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        example: 'fristname',
        required: true
    })
    @IsNotEmpty()
    fristname: string;

    @ApiProperty({
        type: String,
        example: 'lastname',
        required: true
    })
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({
        type: String,
        example: '1234',
        required: true
    })
    @IsNotEmpty()
    password: string;
}