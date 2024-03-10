import { ApiProperty } from "@nestjs/swagger";

export class updateUserEntyty {
    @ApiProperty({
        example: 'email',
        type: String,
    })
    email: string

    @ApiProperty({
        example: 'username',
        type: String
    })
    username: string

    @ApiProperty({
        example: 'fristname',
        type: String
    })
    fristname: string;

    @ApiProperty({
        example: 'lastname',
        type: String
    })
    lastname: string;
}