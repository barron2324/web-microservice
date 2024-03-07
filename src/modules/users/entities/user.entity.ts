import { ApiProperty } from "@nestjs/swagger";

export class userEntyty {
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
}