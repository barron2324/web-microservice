import { ApiProperty } from '@nestjs/swagger'
import { BooksEntity } from './books.entity'

class BooksQueryEntity {
    @ApiProperty({
        type: Number,
        example: 1,
    })
    page: number

    @ApiProperty({
        type: Number,
        example: 20,
    })
    perPage: number

    @ApiProperty({
        type: Number,
        example: 100,
    })
    count: number

    @ApiProperty({
        type: [BooksEntity],
    })
    records: BooksEntity[]
}

export default BooksQueryEntity
