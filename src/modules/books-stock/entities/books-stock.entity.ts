import { ApiProperty } from "@nestjs/swagger";

export class BooksStockEntity {
    @ApiProperty({
        type: String,
        example: 'bookId'
    })
    bookId: string

    @ApiProperty({
        type: String,
        example: 'bookName',
    })
    bookName: string

    @ApiProperty({
        type: Number,
        example: 'totalQuantity',
    })
    totalQuantity: number

    @ApiProperty({
        type: Number,
        example: 'quantityBought',
    })
    quantityBought: number

    @ApiProperty({
        type: Number,
        example: 'totalOrder',
    })
    totalOrder: number

    @ApiProperty({
        type: Date,
        example: new Date(),
    })
    lastOrderAt: Date

    @ApiProperty({
        type: Date,
        example: new Date(),
    })
    quantityUpdateAt: Date

    @ApiProperty({
        type: Date,
        example: new Date(),
    })
    lastStockCheck: Date

    @ApiProperty({
        type: Boolean,
        example: true
    })
    isAvailable: boolean
}