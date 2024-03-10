import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordEntyty {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNzA5OTY0MDA5LCJleHAiOjE3MTAxMzY4MDl9.HFljZ-sad45541asdsad-sIzbXvRP8n1tlsqAknmS8',
        type: String
    })
    password: string
}