import { ApiProperty } from "@nestjs/swagger";

export class BooksEntity {
    @ApiProperty({
        type: String,
        example: 'bookId'
    })
    bookId: string

    @ApiProperty({
        type: String,
        example: 'bookName'
    })
    bookName: string

    @ApiProperty({
        type: String,
        example: 'publisher'
    })
    publisher: string

    @ApiProperty({
        type: Number,
        example: 100
    })
    price: number

    @ApiProperty({
        type: String,
        example: 'imageUrl'
    })
    imageUrl: string

    @ApiProperty({
        type: Boolean,
        example: true
    })
    isAvailable: boolean
}