import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"
import { BooksStockInterface } from "src/modules/books-stock/interfaces/books-stock.interface"
import { BooksInterface } from "src/modules/books/interfaces/books.interface"

export class createOrderDTO {
    @ApiProperty({
        type: String,
        example: 'bookId',
    })
    @IsString()
    @IsNotEmpty()
    bookId: string

    @ApiProperty({
        type: Number,
        example: 100,
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number

    bookStock: BooksStockInterface

    book: BooksInterface
}