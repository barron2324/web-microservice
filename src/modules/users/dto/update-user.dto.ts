import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
    @ApiProperty({
        type: String,
        example: 'firstname',
        required: true
    })
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({
        type: String,
        example: 'lastname',
        required: true
    })
    @IsNotEmpty()
    lastname: string;
}