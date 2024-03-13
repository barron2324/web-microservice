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
        example: 'firstname',
        type: String
    })
    firstname: string;

    @ApiProperty({
        example: 'lastname',
        type: String
    })
    lastname: string;
}