import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
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
}