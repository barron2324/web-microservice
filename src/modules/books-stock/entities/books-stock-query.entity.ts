import { ApiProperty } from '@nestjs/swagger'
import { BooksStockEntity } from './books-stock.entity'

class BooksStockQueryEntity {
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
        type: [BooksStockEntity],
    })
    records: BooksStockEntity[]
}

export default BooksStockQueryEntity
