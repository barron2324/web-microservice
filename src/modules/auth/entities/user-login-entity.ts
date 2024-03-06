import { ApiProperty } from '@nestjs/swagger'

export class UsersLoginEntity {
    @ApiProperty({
        type: String,
        example: 'accessToken',
    })
    accessToken: string

    @ApiProperty({
        type: String,
        example: 'refreshToken',
    })
    refreshToken: string
}
